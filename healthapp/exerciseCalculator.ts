import { avg, countGreaterThanZero, isValidNumber } from "./utils.ts";

type Rating = 1 | 2 | 3;
type RatingDesc = "too little" | "not too bad but could be better" | "great";
interface ExerciseStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const rating = (completionRatio: number): Rating => {
  if (completionRatio < 0.5) {
    return 1;
  } else if (completionRatio < 1) {
    return 2;
  } else {
    return 3;
  }
};

const ratingDesc = (rating: Rating): RatingDesc => {
  switch (rating) {
    case 1:
      return "too little";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "great";
  }
};
const calculateExercises = (
  dailyExerciseInfo: number[],
  targetAmount: number,
): ExerciseStats => {
  return {
    periodLength: dailyExerciseInfo.length,
    trainingDays: countGreaterThanZero(dailyExerciseInfo),
    success: avg(dailyExerciseInfo) > targetAmount,
    rating: rating(avg(dailyExerciseInfo) / targetAmount),
    ratingDescription: ratingDesc(
      rating(avg(dailyExerciseInfo) / targetAmount),
    ),
    target: targetAmount,
    average: avg(dailyExerciseInfo),
  };
};

const parseArgs = (args: string[]) => {
  const argumentCount = 2;
  if (args.length < 2 + argumentCount) {
    throw new Error("Not enough arguments");
  }
  const target = args[2];
  const dailyValues = args.slice(3);
  if (!isValidNumber(target)) {
    throw new Error("Provided target is not a number!");
  }
  if (!dailyValues.every(isValidNumber)) {
    throw new Error("Provided values were not numbers!");
  }
  return { exercises: dailyValues.map(Number), target: Number(target) };
};
const main = () => {
  const { exercises, target } = parseArgs(process.argv);
  console.log(calculateExercises(exercises, target));
};
if (process.argv[1] === import.meta.filename) {
  main();
}
export { calculateExercises };