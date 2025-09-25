import { auth } from "@/lib/auth";
import axios from "axios";

export async function server() {
  const session = await auth();
  return axios.create({
    baseURL: process.env.API_BASE_URL + "/api" || "http://localhost:8000/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${session?.access_token}`,
      "X-Language": "en",
    },
  });
}
