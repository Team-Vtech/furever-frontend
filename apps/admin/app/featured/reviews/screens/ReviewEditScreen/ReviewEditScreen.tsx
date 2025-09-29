"use client";
import { useReviewQuery } from "../../hooks/useReviewQuery";
import { useUpdateReviewMutation } from "../../hooks/useUpdateReviewMutation";
import { useDeleteReviewMutation } from "../../hooks/useDeleteReviewMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReviewEditScreenProps {
  id: number;
}

export function ReviewEditScreen({ id }: ReviewEditScreenProps) {
  const { data: response, isLoading } = useReviewQuery(id);
  const updateMutation = useUpdateReviewMutation();
  const deleteMutation = useDeleteReviewMutation();
  const router = useRouter();
  const review = response?.data;
  const [form, setForm] = useState({
    rating: review?.rating ?? 5,
    comment: review?.comment ?? "",
  });

  if (isLoading) return <div>Loading...</div>;
  if (!review) return <div>Review not found</div>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(
      { id, data: form },
      {
        onSuccess: () => router.push("/featured/reviews"),
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => router.push("/featured/reviews"),
    });
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div>
        <label>Rating</label>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          value={form.rating}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Comment</label>
        <textarea name="comment" value={form.comment} onChange={handleChange} />
      </div>
      <button type="submit" disabled={updateMutation.isPending}>
        Update
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
        className="text-red-600"
      >
        Delete
      </button>
    </form>
  );
}
