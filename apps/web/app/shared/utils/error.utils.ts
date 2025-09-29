import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function FiveHundredError(error: unknown) {
    if (isAxiosError(error)) {
        console.log(error.response?.data);
        return NextResponse.json(
            {
                error: {
                    message: error.response?.data?.message || "Internal Server Error",
                },
            },
            { status: 500 },
        );
    }
    return NextResponse.json(
        {
            error: {
                message: error || "Internal Server Error",
            },
        },
        { status: 500 },
    );
}

export function NotFoundError(error: unknown) {
    return NextResponse.json(
        {
            error: {
                message: error || "Not Found",
            },
        },
        { status: 404 },
    );
}

export function ValidationError(error: unknown) {
    if (error instanceof ZodError) {
        return NextResponse.json(
            {
                error: {
                    message: "Validation Error",
                    issues: error.issues,
                },
            },
            { status: 422 },
        );
    } else {
        return NextResponse.json(
            {
                error: {
                    message: "Validation Error",
                },
            },
            { status: 422 },
        );
    }
}

export function UnauthorizedError(error: unknown) {
    return NextResponse.json(
        {
            error: {
                message: error || "Unauthorized",
            },
        },
        { status: 401 },
    );
}
