const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  console.log(process.env.API_KEY)
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
};

export const config = {
  apiKey: getEnvironmentVariable("REACT_APP_API_KEY"),
  apiUrl: getEnvironmentVariable("REACT_APP_API_URL")
};