// Helper function to display dates according to locale
function getDisplayDate(dateString) {
  let displayDate = dateString
  displayDate = new Date(displayDate).getTime()

  // Get browser locale
  // Help from https://carl-topham.com/articles/javascript-user-locale
  const locale = navigator.language

  // Create new date object after tweaking it to subtract the millisecond
  // Also make UTC the timezone
  displayDate = new Date(displayDate).toLocaleString(locale, {
    timeZone: 'UTC',
  })

  // Find comma and remove trailing text afterwards since we only need date, not times
  const commaIndex = displayDate.indexOf(',')
  displayDate = displayDate.slice(0, commaIndex)

  return displayDate
}

export { getDisplayDate }
