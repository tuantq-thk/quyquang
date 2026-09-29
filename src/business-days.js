const parseLocalDate = (isoDate) => {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
};

/** Counts weekdays after today through (and including) the final work day. */
export const workingDaysRemaining = (todayIso, lastDayIso) => {
  const cursor = parseLocalDate(todayIso);
  const lastDay = parseLocalDate(lastDayIso);
  if (lastDay < cursor) return -1;

  let count = 0;
  while (cursor < lastDay) {
    cursor.setDate(cursor.getDate() + 1);
    const weekday = cursor.getDay();
    if (weekday !== 0 && weekday !== 6) count += 1;
  }
  return count;
};
