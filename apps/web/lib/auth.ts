import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, User } from "@/app/shared/types/general";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await (
            await server()
          ).post<
            JsonResponse<{
              user: User;
              access_token: string;
            }>
          >("/api/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });
          console.log(response, "response");
          return {
            id: response.data.data.user.id.toString(),
            name: response.data.data.user.name,
            email: response.data.data.user.email,
            phone: response.data.data.user.phone,
            status: response.data.data.user.status,
            access_token: response.data.data.access_token,
          };

          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
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
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  pages: {
    signIn: "/admin/login",
  },
});
export async function getSessionUser() {
  const session = await auth();
  return session?.user;
}
