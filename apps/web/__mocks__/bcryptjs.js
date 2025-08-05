// Mock for bcryptjs
module.exports = {
  hash: jest.fn((password, saltRounds) => Promise.resolve('hashedPassword123')),
  compare: jest.fn((password, hash) => Promise.resolve(true)),
  genSalt: jest.fn((rounds) => Promise.resolve('salt123')),
  hashSync: jest.fn((password, saltRounds) => 'hashedPasswordSync123'),
  compareSync: jest.fn((password, hash) => true),
};
