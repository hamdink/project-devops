/**
 ** Hex color to RGBA color
 */
export const hexToRGBA = (hexCode, opacity) => {
  let hex = hexCode.replace('#', '')
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export function formatDate(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);
  
  // Extract the day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  // Return the formatted date
  return `${day}-${month}-${year}`;
}

export function formatDateTime(dateString, timeString) {
  // Parse the date string
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  // Combine the date and time into the desired format
  const formattedDateTime = `${day}/${month}/${year} ${timeString}`;

  return formattedDateTime;
}

// Example usage:
const dateString = "2024-09-27T00:00:00.000Z";
const timeString = "14:14";

console.log(formatDateTime(dateString, timeString)); 