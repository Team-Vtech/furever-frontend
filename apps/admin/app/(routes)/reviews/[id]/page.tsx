import { ReviewEditScreen } from "../../../featured/reviews/screens/ReviewEditScreen/ReviewEditScreen";

export default async function ReviewEditPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return <ReviewEditScreen id={id} />;
}
