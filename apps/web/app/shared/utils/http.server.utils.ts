import { auth } from "@/lib/auth";
import axios from "axios";

export async function server() {
    const session = await auth();
    const baseURL = process.env.API_BASE_URL || "http://localhost:8000";
    return axios.create({
        baseURL: `${baseURL}/api`,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${session?.access_token}`,
            "X-Language": "en",
        },
    });
}
