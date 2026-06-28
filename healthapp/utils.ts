const countGreaterThanZero = (numbers: number[]): number => {
  return numbers.filter((n) => n > 0).length;
};
const avg = (numbers: number[]): number => {
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / numbers.length;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isValidNumber = (n: any): boolean => {
  return !isNaN(Number(n));
};

export { avg, countGreaterThanZero, isValidNumber };
