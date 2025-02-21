export const getCurrentDateTime = () => {
  const now = new Date();
  
  // Get date in YYYY-MM-DD format
  const currentDate = now.toISOString().split('T')[0];
  
  // Get time in HH:mm format in local timezone
  const currentTime = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });

  return { currentDate, currentTime };
};

export const convertToUTC = (date: string, time: string) => {
  const localDateTime = new Date(`${date}T${time}`);

  // Convert to UTC time properly
  const utcDateTime = new Date(
    localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
  );

  return {
    date: utcDateTime.toISOString().split("T")[0], // YYYY-MM-DD in UTC
    time: utcDateTime.toISOString().split("T")[1].substring(0, 5), // HH:MM in UTC
  };
};


export const convertToLocal = (date: string, time: string) => {
  const utcDateTime = new Date(`${date}T${time}Z`);
  return {
    date: utcDateTime.toLocaleDateString('en-CA'), // YYYY-MM-DD format
    time: utcDateTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })
  };
};
