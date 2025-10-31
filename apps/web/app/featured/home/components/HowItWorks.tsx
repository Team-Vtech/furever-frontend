import { Calendar, PawPrint, Search, ShieldCheck } from "lucide-react";

const steps = [
    {
        number: "1",
        icon: PawPrint,
        title: "Create Your Pet Profile",
        description: "Add pet photo, vaccinations, allergies, and behavior notes for personalized care.",
    },
    {
        number: "2",
        icon: Search,
        title: "Explore Services & Providers",
        description: "Discover local, vetted professionals with profiles, reviews, and detailed service offerings.",
    },
    {
        number: "3",
        icon: Calendar,
        title: "Choose a Service",
        description: "Select a service, timeslot, and add-ons tailored to your pet's needs.",
    },
    {
        number: "4",
        icon: ShieldCheck,
        title: "Enjoy Peace of Mind",
        description: "Trust our vetted providers and easily manage all your pet care in one place.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-section">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"How Furever works"}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                        {"Finding trusted pet care is simple and stress-free"}
                    </p>
                </div>

                <div className="grid gap-12 md:grid-cols-4">
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
