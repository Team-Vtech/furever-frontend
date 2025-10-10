import { ServiceType } from "@furever/types";
import { FeaturedProviders } from "../../components/FeaturedProvider";
import { HeroSection } from "../../components/HeroSection";
import { HowItWorks } from "../../components/HowItWorks";
import { ServicesSection } from "../../components/ServicesSection";
import { Testimonials } from "../../components/Testimonials";

type HomePageScreenProps = {
    serviceTypes: ServiceType[];
};

export function HomePageScreen({ serviceTypes }: HomePageScreenProps) {
    return (
        <>
            <HeroSection serviceTypes={serviceTypes} />
            <ServicesSection serviceTypes={serviceTypes} />
            <FeaturedProviders />
            <HowItWorks />
            <Testimonials />
        </>
    );
}
