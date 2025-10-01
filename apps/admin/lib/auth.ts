import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, User } from "@furever/types";
import { isAxiosError } from "axios";
import NextAuth, { type NextAuthResult } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

const IGNORE_PATHS = [
    "/_next",
    "/api",
    "/manifest.json",
    "/manifest.webmanifest",
    "/auth/login",
    "/auth/register",
    "/auth/callback",
    "/auth/signin",
    "/auth/signout",
    "/auth/session",
    "/images",
    "/favicon.ico",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/admin/api",
    "/login", // Pet parent login
    "/register", // Pet parent register
    "/forgot-password", // Pet parent forgot password
    "/api",
];
const result = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                console.log("hi");
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                return null;
                // try {
                //     const response = await (
                //         await server()
                //     ).post<
                //         JsonResponse<{
                //             user: User;
                //             access_token: string;
                //         }>
                //     >("/auth/login", {
                //         email: credentials.email,
                //         password: credentials.password,
                //     });
                //     if (response.status !== 200) {
                //         return null;
                //     }
                //     return {
                //         id: response.data.data.user.id.toString(),
                //         name: response.data.data.user.name,
                //         email: response.data.data.user.email,
                //         phone: response.data.data.user.phone,
                //         status: response.data.data.user.status,
                //         access_token: response.data.data.access_token,
                //         emailVerified: response.data.data.user.emailVerified || null,
                //         address: "",
                //         created_at: "",
                //         roles: [],
                //         updated_at: "",
                //     };
                // } catch (error) {
                //     if (isAxiosError(error) && error.response) {
                //         console.error("Auth error response:", error.response.data);
                //         console.log(error.request);
                //     } else if (error instanceof Error) {
                //         console.error("Auth error:", error);
                //     }
                //     return null;
                // }
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === "update" && session) {
                if (token.user) {
                    token.user = session.user;
                }
                return token;
            } else {
                if (user) {
                    token.user = user as User;
                    token.access_token = user.access_token;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.user) {
                const tokenUser = token.user as User;
                // @ts-expect-error -next-auth types are wrong
                session.user = {
                    ...tokenUser,
                    access_token: token.access_token!,
                };
                session.access_token = token.access_token;
                const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
                session.expires = expires as Date & string;
            }
            return session;
        },
        async authorized({ request, auth }) {
            if (IGNORE_PATHS.some((path) => request.nextUrl.pathname.startsWith(path))) {
                return true;
            }
            if (auth) {
                return true;
            }
            return false;
        },
    },
    pages: {
        signIn: "/login", // Default for admin, will be overridden by redirect
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // 1 day
    },
});

export const handlers: NextAuthResult["handlers"] = result.handlers;
export const auth: NextAuthResult["auth"] = result.auth;
export const signIn: NextAuthResult["signIn"] = result.signIn;
export const signOut: NextAuthResult["signOut"] = result.signOut;
export async function getSessionUser() {
    const session = await auth();
    return session?.user;
}
