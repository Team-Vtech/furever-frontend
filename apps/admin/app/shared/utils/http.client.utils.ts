import axios from "axios";

export function client() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    withCredentials: true,
    withXSRFToken: true,
  });
}
