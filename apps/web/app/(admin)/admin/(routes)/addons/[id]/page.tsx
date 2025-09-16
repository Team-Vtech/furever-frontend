import { Suspense } from "react";
import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";
import { EditAddonScreen } from "../../../featured/addons/screens/EditAddonScreen/EditAddonScreen";

interface EditAddonPageProps {
  params: {
    id: string;
  };
}

export default function EditAddonPage({ params }: EditAddonPageProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditAddonScreen addonId={params.id} />
    </Suspense>
  );
}
