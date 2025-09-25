import { useRouter } from "next/navigation";
import { QuickActionCard } from "./QuickActionCard";

export function QuickActions() {
  const router = useRouter();

  const quickActions = [
    {
      id: 1,
      title: "Book Service",
      icon: "bone",
      onClick: () => console.log("Book Service clicked"),
    },
    {
      id: 2,
      title: "Book Pet Taxi",
      icon: "dog",
      onClick: () => console.log("Book Pet Taxi clicked"),
    },
    {
      id: 3,
      title: "View Pets",
      icon: "paw",
      onClick: () => console.log("View Pets clicked"),
    },
    {
      id: 4,
      title: "My Bookings",
      icon: "calendar",
      onClick: () => router.push("/bookings"),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {quickActions.map((action) => (
        <QuickActionCard key={action.id} action={action} />
      ))}
    </div>
  );
}
