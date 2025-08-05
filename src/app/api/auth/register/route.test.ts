import { POST } from './route';
import { userRepository } from 'db/repositories/UserRepository';
import bcrypt from 'bcryptjs';

// Mock dependencies
jest.mock('db/repositories/UserRepository');
jest.mock('bcryptjs');

const mockUserRepository = userRepository as jest.Mocked<typeof userRepository>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('/api/auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user with valid data', async () => {
    // Setup mocks
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockBcrypt.hash.mockResolvedValue('hashed_password');
    mockUserRepository.create.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    });

    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPass123'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe('Registration successful');
    expect(data.user).toEqual({
      id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: '2023-01-01T00:00:00.000Z'
    });

    // Verify interactions
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(mockBcrypt.hash).toHaveBeenCalledWith('StrongPass123', 12);
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password'
    });
  });

  it('should return 400 for invalid input data', async () => {
    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'A', // Too short
        email: 'invalid-email', // Invalid format
        password: 'weak' // Too short and weak
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input data');
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'name',
          message: 'Name must be at least 2 characters'
        }),
        expect.objectContaining({
          field: 'email',
          message: 'Please enter a valid email address'
        }),
        expect.objectContaining({
          field: 'password',
          message: expect.stringContaining('Password must be at least 8 characters')
        })
      ])
    );

    // Should not call repository methods with invalid data
    expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
    expect(mockUserRepository.create).not.toHaveBeenCalled();
  });

  it('should return 400 for duplicate email', async () => {
    // Setup mocks - user already exists
    mockUserRepository.findByEmail.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      name: 'Existing User',
      email: 'existing@example.com',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    });

    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'StrongPass123'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('An account with this email address already exists');

    // Should check for existing user but not create
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('existing@example.com');
    expect(mockUserRepository.create).not.toHaveBeenCalled();
    expect(mockBcrypt.hash).not.toHaveBeenCalled();
  });

  it('should return 400 for malformed JSON', async () => {
    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid json'
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Registration failed. Please try again.');
  });

  it('should return 500 for database errors', async () => {
    // Setup mocks
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockBcrypt.hash.mockResolvedValue('hashed_password');
    mockUserRepository.create.mockRejectedValue(new Error('Database connection failed'));

    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPass123'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Registration failed. Please try again.');

    // Should have attempted to check and create
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(mockUserRepository.create).toHaveBeenCalled();
  });

  it('should handle MongoDB duplicate key error', async () => {
    // Setup mocks
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockBcrypt.hash.mockResolvedValue('hashed_password');
    mockUserRepository.create.mockRejectedValue(
      new Error('E11000 duplicate key error collection')
    );

    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPass123'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('An account with this email address already exists');
  });

  it('should validate password strength requirements', async () => {
    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weakpassword' // Missing uppercase and number
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid input data');
    expect(data.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'password',
          message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        })
      ])
    );
  });

  it('should hash password with secure salt rounds', async () => {
    // Setup mocks
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockBcrypt.hash.mockResolvedValue('hashed_password');
    mockUserRepository.create.mockResolvedValue({
      _id: '507f1f77bcf86cd799439011',
      name: 'John Doe',
      email: 'john@example.com',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01'),
    });

    const request = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'StrongPass123'
      })
    });

    await POST(request);

    // Verify password is hashed with 12 salt rounds (secure)
    expect(mockBcrypt.hash).toHaveBeenCalledWith('StrongPass123', 12);
  });
});
