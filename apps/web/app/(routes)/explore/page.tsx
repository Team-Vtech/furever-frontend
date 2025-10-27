import { ExploreScreen } from "@/app/featured/explore/screens/ExploreScreen/ExploreScreen";
import { Metadata } from "next";
import { Suspense } from "react";
import { MainLayout } from "../../shared/components/MainLayout";

export const metadata: Metadata = {
    title: "Explore Services | Furever",
    description: "Discover pet care services in your area. Find vets, groomers, walkers, and other pet care professionals.",
};

export default function ExplorePage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <ExploreScreen />
            </Suspense>
        </MainLayout>
    );
}
