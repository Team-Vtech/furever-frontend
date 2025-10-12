"use client";

import { cn } from "@furever/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
    className?: string;
}

const navigationLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
];

const providerLinks = [
    { label: "Join as a Provider", href: "/providers/register" },
    { label: "Provider Login", href: "/providers/login" },
];

const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Cancellation & Refund", href: "/cancellation-refund" },
];

const socialLinks = [
    { name: "Facebook", icon: "/icons/facebook.svg", href: "#" },
    { name: "Twitter", icon: "/icons/twitter.svg", href: "#" },
    { name: "Instagram", icon: "/icons/instagram.svg", href: "#" },
    { name: "LinkedIn", icon: "/icons/linkedin.svg", href: "#" },
];

export function Footer({ className }: FooterProps) {
    return (
        <footer className={cn("bg-gradient-to-r from-purple-600 to-purple-400 text-white", className)}>
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Social Media Icons */}
                    <div className="flex flex-col items-start">
                        <div className="mb-6 flex items-center gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    className="group transition-transform duration-200 hover:scale-110"
                                    aria-label={social.name}
                                >
                                    <div className="h-5 w-5 opacity-80 transition-opacity group-hover:opacity-100">
                                        <Image
                                            src={social.icon}
                                            alt={social.name}
                                            width={20}
                                            height={20}
                                            className="h-full w-full brightness-0 invert filter"
                                        />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col">
                        <h3 className="mb-4 text-sm font-semibold opacity-90">Navigation</h3>
                        <ul className="space-y-3">
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm opacity-80 transition-opacity duration-200 hover:opacity-100">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Provider Links */}
                    <div className="flex flex-col">
                        <h3 className="mb-4 text-sm font-semibold opacity-90">Providers</h3>
                        <ul className="space-y-3">
                            {providerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm opacity-80 transition-opacity duration-200 hover:opacity-100">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-col">
                        <h3 className="mb-4 text-sm font-semibold opacity-90">Legal</h3>
                        <ul className="space-y-3">
                            {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm opacity-80 transition-opacity duration-200 hover:opacity-100">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="mt-12 border-t border-white/20 pt-8">
                    <div className="flex flex-col items-center justify-between md:flex-row">
                        <p className="text-sm opacity-80">© {new Date().getFullYear()} Furever. All rights reserved.</p>
                        <p className="mt-2 text-sm opacity-80 md:mt-0">Made with ❤️ for pet lovers everywhere</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
