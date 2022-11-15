interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Inputs {
  hours: Array<number>;
  target: number;
}

const parseArgv = (args: Array<string>): Inputs => {
  if (args.length < 2) throw new Error("Not enough arguments");

  let isAllInputValid = true;
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) isAllInputValid = false;
  }

  if (isAllInputValid) {
    return {
      hours: args.slice(3).map((string) => Number(string)),
      target: Number(args[2]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateExercises = (hours: Array<number>, target: number) => {
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;

  const result: Result = {
    periodLength: hours.length,
    trainingDays: hours.filter((day) => day !== 0).length,
    success: average >= target,
    rating:
      average > target
        ? Math.floor(Math.random() * 10 + 5)
        : Math.floor(Math.random() * 5),
    ratingDescription:
      average > target ? "Not Bad, keep going" : "You need to work harder",
    target: target,
    average: average,
  };

  return result;
};

try {
  const { hours, target } = parseArgv(process.argv);
  calculateExercises(hours, target);
} catch (err: unknown) {
  let errorMsg = "Something went wrong.";
  if (err instanceof Error) {
    errorMsg += " Error: " + err.message;
  }
  console.log(errorMsg);
}

export default calculateExercises;
