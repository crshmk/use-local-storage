export default {
  // Use the jsdom test environment
  testEnvironment: 'jest-environment-jsdom',

  // Transform files with Babel or ts-jest
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest', // Or use ts-jest for TypeScript
  },

  // Treat .ts, .tsx, and .js files as ES Modules
  extensionsToTreatAsEsm: ['.ts', '.tsx'],

  // Resolve module paths
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Example aliasing
  },

  // Ignore transforming node_modules unless explicitly included
  transformIgnorePatterns: [
    '/node_modules/(?!(your-esm-package-name|another-esm-package)/)',
  ],
};
