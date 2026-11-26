import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

export default createJestConfig({
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/tests/**/*.test.{ts,tsx}"],
  moduleNameMapper: { "^@/(.*)$": "<rootDir>/src/$1" },
  ...{
    reporters: [
      "default",
      [
        "jest-junit",
        { outputDirectory: "reports", outputName: "junit-components.xml" },
      ],
    ],
  },
});
