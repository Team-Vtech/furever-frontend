import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ServiceIdSchema } from "../../services.schema";
import {
  ValidationError,
  NotFoundError,
} from "../../../../../../../shared/utils/error.utils";

// Mock database - Replace with actual Prisma calls
interface MockService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  status: "active" | "draft" | "inactive";
  categories: string[];
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// This would be shared or imported from a central location
let mockServices: MockService[] = [
  {
    id: "1",
    name: "Cat Spa Day",
    description:
      "Relaxing bath, gentle brushing, and claw trimming for feline friends. Includes de-shedding.",
    price: 60.0,
    duration: 60,
    status: "active",
    categories: ["Cats"],
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Standard Dog Grooming",
    description:
      "Full grooming session including bath, brush, haircut, nail trim, and ear cleaning for all dog breeds.",
    price: 75.0,
    duration: 90,
    status: "active",
    categories: ["Dogs"],
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Exotic Pet Check-up",
    description:
      "Routine health assessment and basic care for birds, reptiles, and small mammals. Not for emergencies.",
    price: 45.0,
    duration: 45,
    status: "draft",
    categories: ["Birds", "Reptiles", "Small Animals"],
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface RouteParams {
  params: { id: string };
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = ServiceIdSchema.parse({ id: params.id });

    const service = mockServices.find((s) => s.id === id);

    if (!service) {
      return NotFoundError("Service not found");
    }

    const duplicatedService: MockService = {
      ...service,
      id: Math.random().toString(36).substr(2, 9), // Generate new ID
      name: `${service.name} (Copy)`,
      status: "draft", // New services start as draft
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockServices.push(duplicatedService);

    return NextResponse.json(duplicatedService, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
