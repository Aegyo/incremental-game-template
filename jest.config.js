module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "\\.js$": "<rootDir>/node_modules/babel-jest"
  },
};
