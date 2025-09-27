import { NextRequest, NextResponse } from "next/server";
import { FiveHundredError, ValidationError } from "../../../shared/utils/error.utils";
import { bookingReviewSchema } from "./review.schema";
import { server } from "@/app/shared/utils/http.server.utils";

export async function GET(req: NextRequest) {
 try {
     const url = new URL(req.url);
     const params = Object.fromEntries(url.searchParams.entries());
    const response = await ( await server() ).get("/admin/booking-reviews", { params });
     // TODO: Fetch reviews from DB using filters
     return NextResponse.json(response.data);
 } catch (error) {
        return FiveHundredError(error);
 }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = bookingReviewSchema.safeParse(body);
  if (!result.success) {
    return ValidationError(result.error);
  }
  // TODO: Create review in DB, user_id from session
  return NextResponse.json({});
}
