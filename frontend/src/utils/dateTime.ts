export const toUTC = (date: string, time: string) => {
  const localDate = new Date(`${date}T${time}`);
  const utcDate = new Date(
    localDate.getTime() - localDate.getTimezoneOffset() * 60000
  );
  return {
    date: utcDate.toISOString().split('T')[0],
    time: utcDate.toISOString().split('T')[1].substring(0, 5)
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