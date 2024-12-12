export function formatTime(date: Date): string {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString().padStart(2, "0"); // Convert '0' hour to '12'
  const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure 2-digit minutes
  return `${ampm} ${formattedHours}:${formattedMinutes}`;
}

export const waitForSeconds = (seconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

export const kelvinToCelsius = (kelvin: number): number => {
  return kelvin - 273.15;
};
