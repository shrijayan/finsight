// Mock for next-auth/next
module.exports = {
  getServerSession: jest.fn(() => Promise.resolve(null)),
  NextAuth: jest.fn(() => ({})),
  authOptions: {},
};
