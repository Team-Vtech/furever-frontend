import "next-auth";
import "next-auth/jwt";
import { User as BackendUser, UserStatus } from "@furever/types";
declare module "next-auth" {
  interface User extends Omit<BackendUser, "id"> {
    id: number;
    access_token: string;
  }

  interface Session {
    user: BackendUser | null;
    access_token: string | null;
  }
}

import "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    /** User information */
    user: BackendUser | null;
    /** Session token */
    access_token: string | null;
  }
}
