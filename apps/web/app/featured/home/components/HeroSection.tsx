"use client";
import { ServiceType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Calendar } from "@furever/ui/components/calendar";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@furever/ui/components/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { cn } from "@furever/ui/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type HeroSectionProps = {
    serviceTypes: ServiceType[];
};

export function HeroSection({ serviceTypes = [] }: HeroSectionProps) {
    const [filters, setFilters] = useState<Record<string, string>>({});
    return (
        <section className="from-secondary to-background relative overflow-hidden bg-gradient-to-b">
            <div className="absolute inset-0 bg-[url('/images/happy-pets-dogs-cats-pattern.jpg')] bg-cover bg-center opacity-5" />

            <div className="container relative mx-auto py-20 md:py-32">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">{"Loving pet care in your neighborhood"}</h1>
                    <p className="text-muted-foreground mb-10 text-pretty text-lg md:text-xl">
                        {"Book trusted pet care providers and services for your furry family members"}
                    </p>

                    <div className="bg-card rounded-2xl border p-6 shadow-xl md:p-8">
                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Service Type</Label>
                                <Select
                                    defaultValue="all"
                                    value={filters["service_type"] || "all"}
                                    onValueChange={(value) => {
                                        setFilters((prev) => ({ ...prev, service_type: String(value) }));
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select service type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Services types</SelectItem>
                                        {serviceTypes.map((type) => (
                                            <SelectItem key={type.id} value={String(type.id)}>
                                                {type.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Location</Label>
                                <div className="relative">
                                    <MapPin className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                                    <Input
                                        placeholder="Enter your location"
                                        className="pl-10"
                                        onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn("w-full justify-start text-left font-normal", !filters["date"] && "text-muted-foreground")}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {filters["date"] ? format(new Date(filters["date"]), "PPP") : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={filters["date"] ? new Date(filters["date"]) : undefined}
                                            onSelect={(date) => {
                                                if (date) {
                                                    setFilters((prev) => ({ ...prev, date: date.toISOString() }));
                                                }
                                            }}
                                            disabled={(date) => date < new Date()}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <Button size="lg" className="w-full" asChild>
                            <Link href={"/explore?" + new URLSearchParams(filters).toString()}>
                                <Search className="mr-2 h-5 w-5" />
                                Find Providers
                            </Link>
                        </Button>
                    </div>

                    <div className="text-muted-foreground mt-8 flex items-center justify-center gap-2 text-sm">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="border-background bg-muted h-8 w-8 rounded-full border-2"
                                    style={{
                                        backgroundImage: `url('/pet-owner---i-.jpg')`,
                                        backgroundSize: "cover",
                                    }}
                                />
                            ))}
                        </div>
                        <span>{"Trusted by 50,000+ pet owners"}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
