interface MultiplyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / ((height * height) / 10000);
  let result;
  if (bmi < 18.5) result = "Underweight (unhealthy weight)";
  else if (bmi < 22.9) result = "Normal (healthy weight)";
  else if (bmi < 24.9) result = "Overweight (at risk)";
  else if (bmi < 29.9) result = "Overweight (moderately obese)";
  else result = "Overweight (severely obese)";

  console.log(result);
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (err: unknown) {
  let errorMsg = "Something went wrong.";
  if (err instanceof Error) {
    errorMsg += " Error: " + err.message;
  }
  console.log(errorMsg);
}
