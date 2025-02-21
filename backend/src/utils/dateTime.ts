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
  return {
    date: localDateTime.toISOString().split('T')[0],
    time: localDateTime.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC'
    })
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
