import { ExploreScreen } from "@/app/featured/explore/screens/ExploreScreen/ExploreScreen";
import { Suspense } from "react";
import { MainLayout } from "../../shared/components/MainLayout";

export default function ExplorePage() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <ExploreScreen />
            </Suspense>
        </MainLayout>
    );
}
