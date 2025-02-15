export const getCurrentDateTime = () => {
  const now = new Date();

  // Get date in YYYY-MM-DD format using system timezone
  const currentDate = now
    .toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  // Get time in HH:mm format using system timezone
  const currentTime = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  console.log("Current System DateTime:", { currentDate, currentTime });
  return { currentDate, currentTime };
};
