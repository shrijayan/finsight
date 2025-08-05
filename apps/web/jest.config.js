const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Transform ES modules from node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(bson|jose|openid-client|mongodb|@google)/)'
  ],
  // Module name mappings and mocks
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^db/src/repositories/AnalysisReportRepository$': '<rootDir>/__mocks__/db.js',
    '^db/(.*)$': '<rootDir>/../../packages/db/src/$1',
    '^lib/(.*)$': '<rootDir>/../../packages/lib/src/$1',
    '^next-auth/next$': '<rootDir>/__mocks__/next-auth.js',
    '^@vercel/blob$': '<rootDir>/__mocks__/vercel-blob.js',
    '^next/server$': '<rootDir>/__mocks__/next-server.js',
    '^mongoose$': '<rootDir>/__mocks__/mongoose.js',
    '^bcrypt$': '<rootDir>/__mocks__/bcrypt.js',
    '^bcryptjs$': '<rootDir>/__mocks__/bcryptjs.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(config)
