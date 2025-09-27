import { ReviewEditScreen } from "../../../featured/reviews/screens/ReviewEditScreen/ReviewEditScreen";

interface Props {
  params: { id: string };
}

export default function ReviewEditPage({ params }: Props) {
  const id = Number(params.id);
  return <ReviewEditScreen id={id} />;
}
