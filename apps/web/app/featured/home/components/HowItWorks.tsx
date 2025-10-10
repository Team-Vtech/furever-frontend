import { Search, Calendar, Heart } from "lucide-react"

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
]

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">{"How PetCare works"}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {"Finding trusted pet care is simple and stress-free"}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
