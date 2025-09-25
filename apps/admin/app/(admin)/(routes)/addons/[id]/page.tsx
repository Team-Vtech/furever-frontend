import { Suspense } from "react";
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
