// Mock for mongoose
const mockModel = {
  find: jest.fn(() => ({ sort: jest.fn(() => ({ exec: jest.fn(() => Promise.resolve([])) })) })),
  findOne: jest.fn(() => ({ exec: jest.fn(() => Promise.resolve(null)) })),
  findById: jest.fn(() => ({ exec: jest.fn(() => Promise.resolve(null)) })),
  findByIdAndUpdate: jest.fn(() => ({ exec: jest.fn(() => Promise.resolve({})) })),
  findByIdAndDelete: jest.fn(() => ({ exec: jest.fn(() => Promise.resolve({})) })),
  create: jest.fn(() => Promise.resolve({})),
  save: jest.fn(() => Promise.resolve({})),
  countDocuments: jest.fn(() => ({ exec: jest.fn(() => Promise.resolve(0)) })),
};

const mockSchema = jest.fn(() => ({
  index: jest.fn(),
  pre: jest.fn(),
  post: jest.fn(),
  virtual: jest.fn(() => ({ get: jest.fn(), set: jest.fn() })),
}));

mockSchema.Types = {
  ObjectId: class ObjectId {
    constructor(id) {
      this.id = id || 'mockObjectId123';
    }
    toString() {
      return this.id;
    }
  }
};

const mongoose = {
  connect: jest.fn(() => Promise.resolve()),
  disconnect: jest.fn(() => Promise.resolve()),
  connection: {
    readyState: 1,
    on: jest.fn(),
    once: jest.fn(),
  },
  model: jest.fn(() => mockModel),
  models: {}, // Empty models object that User model checks for
  Schema: mockSchema,
  Types: mockSchema.Types,
};

module.exports = mongoose;
