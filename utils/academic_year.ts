export const getAcademicYear = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const month = date.getMonth(); // 0 is January, 2 is March

  // If before March, session is (Prev Year)-(Current Year)
  // If March or after, session is (Current Year)-(Next Year)
  return month < 3
    ? `${currentYear - 1}-${currentYear.toString().slice(-2)}` 
    : `${currentYear}-${(currentYear + 1).toString().slice(-2)}`;
};