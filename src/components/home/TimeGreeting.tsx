"use client";

function getGreeting(): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(new Date()),
  );

  if (hour < 12) return "Morning.";
  if (hour < 18) return "Afternoon.";
  return "Evening.";
}

export default function TimeGreeting() {
  return <span suppressHydrationWarning>{getGreeting()}</span>;
}
