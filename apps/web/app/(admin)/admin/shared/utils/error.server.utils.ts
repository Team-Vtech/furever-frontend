import { isAxiosError } from 'axios';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export function handleValidationError(error: unknown) {
    if (error instanceof z.ZodError) {
        return NextResponse.json(
            {
                message: 'Bad request',
                errors: error.issues || [],
            },
            { status: 400 },
        );
    }

    return NextResponse.json(
        {
            message: 'Invalid request',
            errors: [],
        },
        { status: 400 },
    );
}

export function handleServerError(error: unknown) {
    if (isAxiosError(error)) {
        return NextResponse.json(
            {
                message: error.response?.data?.message || 'Internal server error',
                errors: error.response?.data?.errors || [],
            },
            { status: error.response?.status || 500 },
        );
    }
    return NextResponse.json(
        {
            message: 'Internal server error',
            errors: [],
        },
        { status: 500 },
    );
}
