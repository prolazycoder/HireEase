'use client'

export const toUTC = (date: string, time: string) => {
  // Create a Date object by explicitly setting the local time
  const localDate = new Date(`${date}T${time}:00`);

  // Convert it to UTC using toISOString (which is always in UTC)
  return {
    date: localDate.toISOString().split("T")[0], // YYYY-MM-DD
    time: localDate.toISOString().split("T")[1].substring(0, 5), // HH:MM
  };
};

export const toLocal = (date: string, time: string) => {
  const utcDate = new Date(`${date}T${time}Z`);
  return {
    date: utcDate.toLocaleDateString('en-CA'), // YYYY-MM-DD
    time: utcDate.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}; 

export const getCurrentDateTime = () => {
  const now = new Date();

  // Ensure both date and time are taken from local time
  const date = now.toLocaleDateString("en-CA"); // YYYY-MM-DD format in local time
  const time = now.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  // Add 1 hour for end time
  const endTime = new Date(now.getTime() + 60 * 60 * 1000).toLocaleTimeString(
    "en-US",
    {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return { date, time, endTime };
};