export const monthMapping: Record<string, number> = {
  JAN: 1,
  FEV: 2,
  MAR: 3,
  ABR: 4,
  MAI: 5,
  JUN: 6,
  JUL: 7,
  AGO: 8,
  SET: 9,
  OUT: 10,
  NOV: 11,
  DEZ: 12,
};

export const mapMonth = (monthNumber: number) => {
  const month = Object.entries(monthMapping).find(
    ([_, value]) => value === monthNumber
  );
  return month?.[0];
};
