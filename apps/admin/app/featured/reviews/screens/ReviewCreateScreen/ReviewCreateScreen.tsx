'use client'
import { useCreateReviewMutation } from "../../hooks/useCreateReviewMutation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewCreateScreen() {
  const createMutation = useCreateReviewMutation();
  const router = useRouter();
  const [form, setForm] = useState({
    rating: 5,
    comment: "",
    booking_id: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(form, {
      onSuccess: () => router.push("/reviews"),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Booking ID</label>
        <input
          type="number"
          name="booking_id"
          value={form.booking_id}
          onChange={handleChange}
        />
      </div>
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
      <button type="submit" disabled={createMutation.isPending}>
        Create
      </button>
    </form>
  );
}
