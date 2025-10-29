import { Award, Heart, Shield, Users } from "lucide-react";
import { Metadata } from "next";
import { MainLayout } from "../../shared/components/MainLayout";

export const metadata: Metadata = {
    title: "About Us - Furever",
    description: "Learn about Furever's mission to connect pet owners with trusted, professional pet care services.",
};

export default function AboutPage() {
    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">About Furever</h1>

                    <div className="prose prose-lg max-w-none">
                        <p className="mb-8 text-lg text-gray-600">Connecting pet owners with trusted, professional pet care services since 2023</p>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Mission</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    At Furever, we believe that every pet deserves the best care possible. Our mission is to connect pet owners with
                                    qualified, trustworthy pet care professionals who share our passion for animal welfare and provide exceptional
                                    service.
                                </p>
                                <p>
                                    We understand that your pets are family, and finding the right care for them shouldn't be stressful or
                                    time-consuming. That's why we've created a platform that makes it easy to find, book, and manage pet care services
                                    with confidence.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">What We Do</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>Furever provides a comprehensive platform for pet care services including:</p>
                                <ul className="list-disc space-y-2 pl-6">
                                    <li>Pet sitting and dog walking services</li>
                                    <li>Grooming and spa treatments</li>
                                    <li>Veterinary care coordination</li>
                                    <li>Pet training and behavioral services</li>
                                    <li>Emergency pet care</li>
                                    <li>Pet transportation services</li>
                                    <li>Specialized care for senior pets and those with medical needs</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Values</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="rounded-lg border p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 flex items-center justify-center rounded-full p-2">
                                            <Heart className="text-primary h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Compassion</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        We treat every pet with the love and care they deserve, understanding that they are beloved family members.
                                    </p>
                                </div>

                                <div className="rounded-lg border p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 flex items-center justify-center rounded-full p-2">
                                            <Shield className="text-primary h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Trust & Safety</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        All our service providers undergo rigorous background checks and are fully insured for your peace of mind.
                                    </p>
                                </div>

                                <div className="rounded-lg border p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 flex items-center justify-center rounded-full p-2">
                                            <Award className="text-primary h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Excellence</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        We maintain the highest standards of service quality and continuously improve our platform based on feedback.
                                    </p>
                                </div>

                                <div className="rounded-lg border p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="bg-primary/10 flex items-center justify-center rounded-full p-2">
                                            <Users className="text-primary h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                                    </div>
                                    <p className="text-gray-700">
                                        We foster a supportive community of pet owners and care providers who share our passion for animal welfare.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Story</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Furever was founded in 2023 by a team of pet lovers who experienced firsthand the challenges of finding reliable,
                                    high-quality pet care services. After struggling to find trustworthy pet sitters and caregivers for their own
                                    beloved animals, our founders decided to create a solution.
                                </p>
                                <p>
                                    What started as a small local service has grown into a comprehensive platform serving pet owners across the
                                    country. Today, we're proud to have connected thousands of pet owners with qualified care providers, creating
                                    lasting relationships built on trust, compassion, and exceptional service.
                                </p>
                                <p>
                                    Our commitment to animal welfare extends beyond our platform. We partner with local animal shelters, support
                                    rescue organizations, and promote responsible pet ownership throughout our community.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Why Choose Furever?</h2>
                            <div className="space-y-4 text-gray-700">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">Vetted Professionals</h3>
                                        <p>
                                            All service providers undergo comprehensive background checks, reference verification, and ongoing
                                            training.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">24/7 Support</h3>
                                        <p>Our customer support team is available around the clock to assist you and your pets.</p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">Flexible Scheduling</h3>
                                        <p>Book services on-demand or schedule recurring care that fits your lifestyle.</p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">Transparent Pricing</h3>
                                        <p>No hidden fees or surprise charges. You always know exactly what you're paying for.</p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">Insurance Coverage</h3>
                                        <p>All services are fully insured, giving you peace of mind for your pet's safety.</p>
                                    </div>
                                    <div>
                                        <h3 className="mb-2 text-lg font-medium text-gray-900">Real-time Updates</h3>
                                        <p>Stay connected with photo updates and real-time communication during service visits.</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Our Team</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Our team is made up of passionate pet lovers, experienced veterinarians, animal behaviorists, and technology
                                    experts who work together to ensure the best possible experience for both pets and their owners.
                                </p>
                                <p>
                                    We're constantly learning, growing, and adapting to better serve our community. Every team member shares our
                                    commitment to animal welfare and understands the importance of the human-animal bond.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="mb-4 text-2xl font-semibold text-gray-900">Join Our Community</h2>
                            <div className="space-y-4 text-gray-700">
                                <p>
                                    Whether you're a pet owner looking for care services or a professional wanting to provide them, we invite you to
                                    join the Furever community. Together, we can ensure that every pet receives the love, care, and attention they
                                    deserve.
                                </p>
                                <div className="bg-primary/5 rounded-lg p-6 text-center">
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">Ready to Get Started?</h3>
                                    <p className="mb-4 text-gray-600">
                                        Join thousands of happy pet owners who trust Furever for their pet care needs.
                                    </p>
                                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                                        <a
                                            href="/register"
                                            className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium text-white transition-colors"
                                        >
                                            Sign Up as Pet Owner
                                        </a>
                                        <a
                                            href="/provider-register"
                                            className="border-primary text-primary hover:bg-primary inline-flex items-center justify-center rounded-md border px-6 py-3 text-sm font-medium transition-colors hover:text-white"
                                        >
                                            Become a Provider
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
