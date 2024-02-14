export function formatDateToDDMMYYYY(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }
  return date.toLocaleDateString(undefined, options)
}
