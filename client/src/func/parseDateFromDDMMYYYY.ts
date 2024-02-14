export function parseDateFromDDMMYYYY(dateString: string) {
  // Split the string into day, month, and year
  const [day, month, year] = dateString.split('/')

  // Create a Date object (months are 0-based in JavaScript, so subtract 1 from the month)
  const parsedDate = new Date(Number(year), Number(month) - 1, Number(day))

  return parsedDate
}
