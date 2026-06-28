import express from "express";
import { isValidNumber } from "./utils.ts";
import { calculateBmi } from "./bmiCalculator.ts";
import { calculateExercises } from "./exerciseCalculator.ts";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});


app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isValidNumber(height) || !isValidNumber(weight)) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  }
  res.send({
    weight: Number(weight),
    height: Number(height),
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res) => {
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: exercises, target } = req.body;
  if (exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: "parameters missing"
    });
  }

  if (!isValidNumber(target) 
    // eslint-disable-next-line
  || !exercises.every(isValidNumber)) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }
  
  
  return res.json({
    // eslint-disable-next-line
    ...calculateExercises(exercises.map(Number) as number[], Number(target))
  });
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log("server stared at port", PORT);
});
