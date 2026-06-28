import { isValidNumber } from "./utils.ts";

type BmiClass = "Underweight" | "Normal range" | "Overweight" | "Obese";

interface PersonInfo {
  heightCm: number;
  weightKg: number;
}

const calculateBmi = (heightCm: number, weightKg: number): BmiClass => {
  const heightMeter = heightCm / 100;
  const bmi = weightKg / (heightMeter * heightMeter);
  if (bmi < 16.0) {
    return "Underweight"; // (Severe thinness)
  } else if (bmi < 17.0) {
    return "Underweight"; // (Moderate thinness)
  } else if (bmi < 18.5) {
    return "Underweight"; // (Mild thinness)
  } else if (bmi < 25.0) {
    return "Normal range";
  } else if (bmi < 30.0) {
    return "Overweight"; //  (Pre-obese)
  } else if (bmi < 35.0) {
    return "Obese"; // (Class I)
  } else if (bmi < 40.0) {
    return "Obese"; // (Class II)
  } else {
    return "Obese"; // (Class III)
  }
};

const parseArgs = (args: string[]): PersonInfo => {
  const argumentCount = 2;
  if (args.length < 2 + argumentCount) {
    throw new Error("Not enough arguments");
  }
  if (args.length > 2 + argumentCount) {
    throw new Error("Too many arguments");
  }
  const heightArg = args[2];
  const weightArg = args[3];
  if (!isValidNumber(heightArg) || !isValidNumber(weightArg)) {
    throw new Error("Provided values were not numbers!");
  }
  return { heightCm: Number(heightArg), weightKg: Number(weightArg) };
};
const main = () => {
  const { heightCm, weightKg } = parseArgs(process.argv);
  console.log(calculateBmi(heightCm, weightKg));
};
if (process.argv[1] === import.meta.filename) {
  main();
}
export { calculateBmi };