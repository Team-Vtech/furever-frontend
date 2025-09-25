import { ReminderCard } from "./ReminderCard";

const reminders = [
  {
    id: 1,
    title: "Grooming with PetSalon",
    date: "Mon, Oct 28 | 10:00 AM",
    description: "Next appointment for Sheru",
    type: "upcoming" as const,
    icon: "calendar-check",
  },
  {
    id: 2,
    title: "Annual Rabies Vaccine (Munni)",
    date: "Fri, Nov 15 | All day",
    description: "Due in 2 weeks",
    type: "critical" as const,
    icon: "syringe",
  },
  {
    id: 3,
    title: "Dog Training Session (Raja)",
    date: "Tue, Dec 3 | 02:00 PM",
    description: "Session 3 with Alpha Paws",
    type: "upcoming" as const,
    icon: "calendar-check",
  },
];

export function UpcomingReminders() {
  return (
    <div className="space-y-4">
      {reminders.map((reminder) => (
        <ReminderCard key={reminder.id} reminder={reminder} />
      ))}
    </div>
  );
}
