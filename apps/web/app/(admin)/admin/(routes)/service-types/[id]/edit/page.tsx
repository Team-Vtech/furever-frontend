import { EditServiceTypeScreen } from "../../../../featured/service-types/screens/EditServiceTypeScreen";

interface EditServiceTypePageProps {
  params: {
    id: string;
  };
}

export default function EditServiceTypePage({
  params,
}: EditServiceTypePageProps) {
  return <EditServiceTypeScreen serviceTypeId={params.id} />;
}
