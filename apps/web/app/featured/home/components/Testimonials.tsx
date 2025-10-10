import { Card, CardContent } from "@furever/ui/components/card";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Jessica Martinez",
        pet: "Golden Retriever",
        image: "/woman-golden-retriever.png",
        quote: "I was nervous leaving Max for the first time, but Sarah made everything so easy. She sent daily photos and Max came home happy and tired!",
        rating: 5,
    },
    {
        name: "David Thompson",
        pet: "Tabby Cat",
        image: "/agustin-testimonial.png",
        quote: "My cat Luna is very shy, but Michael was patient and caring. I could tell she was comfortable and well cared for. Highly recommend!",
        rating: 5,
    },
];

export function Testimonials() {
    return (
        <section className="bg-secondary/30 py-20 md:py-28">
            <div className="container mx-auto">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-balance text-3xl font-bold md:text-4xl">{"What pet owners are saying"}</h2>
                    <p className="text-muted-foreground mx-auto max-w-2xl text-pretty text-lg">
                        {"Real stories from happy pet parents in our community"}
                    </p>
                </div>

                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                    {testimonials.map((testimonial) => (
                        <Card key={testimonial.name} className="overflow-hidden">
                            <div className="bg-muted h-64 bg-cover bg-center" style={{ backgroundImage: `url('${testimonial.image}')` }} />
                            <CardContent className="p-6">
                                <div className="mb-4 flex gap-1">
                                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                                        <Star key={i} className="fill-primary text-primary h-5 w-5" />
                                    ))}
                                </div>
                                <p className="mb-4 text-pretty text-lg">"{testimonial.quote}"</p>
                                <div>
                                    <div className="font-semibold">{testimonial.name}</div>
                                    <div className="text-muted-foreground text-sm">{testimonial.pet} owner</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
