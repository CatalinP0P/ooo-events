export default function formatDateToDDMMYYYY(date) {
  // Check if the input is a valid Date object
  if (!(date instanceof Date) || isNaN(date)) {
    console.error('Invalid date input')
    return null
  }

  // Get the day, month, and year from the date object
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
  const year = date.getFullYear()

  // Return the formatted date
  return `${day}/${month}/${year}`
}
