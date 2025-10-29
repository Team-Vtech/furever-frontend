import { Calendar, Heart, Search } from "lucide-react";

const steps = [
    {
        number: "1",
        icon: Search,
        title: "Search",
        description: "Browse verified profiles of pet care providers in your area and read reviews from other pet owners.",
    },
    {
        number: "2",
        icon: Calendar,
        title: "Book & Pay",
        description: "Choose your dates and book instantly. Secure payment processing with our satisfaction guarantee.",
    },
    {
        number: "3",
        icon: Heart,
        title: "Relax",
        description: "Stay in touch with photo updates and messages. Your pets are in loving, trusted hands.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-section">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"How PetCare works"}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                        {"Finding trusted pet care is simple and stress-free"}
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className="relative mb-6 inline-flex items-center justify-center">
                                <div className="bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full">
                                    <step.icon className="text-primary h-10 w-10" />
                                </div>
                                <div className="bg-primary text-primary-foreground absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full font-bold">
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="mb-3 text-2xl font-bold">{step.title}</h3>
                            <p className="text-muted-foreground text-pretty">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
