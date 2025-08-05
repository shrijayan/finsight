import { UserRepository, userRepository } from './UserRepository';
import { CreateUserData, UpdateUserData } from 'lib/src/types';

describe('UserRepository', () => {
  describe('create', () => {
    it('should create a user with valid data', async () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedpassword123',
      };

      const createdUser = await userRepository.create(userData);

      expect(createdUser._id).toBeDefined();
      expect(createdUser.name).toBe(userData.name);
      expect(createdUser.email).toBe(userData.email);
      expect(createdUser.createdAt).toBeDefined();
      expect(createdUser.updatedAt).toBeDefined();
      // Password should not be included in public user data
      expect((createdUser as any).password).toBeUndefined();
    });

    it('should handle duplicate email error', async () => {
      const userData: CreateUserData = {
        name: 'First User',
        email: 'duplicate@example.com',
        password: 'password123',
      };

      // Create first user
      await userRepository.create(userData);

      // Attempt to create second user with same email
      const duplicateUserData: CreateUserData = {
        name: 'Second User',
        email: 'duplicate@example.com',
        password: 'password456',
      };

      await expect(userRepository.create(duplicateUserData)).rejects.toThrow();
    });
  });

  describe('findByEmail', () => {
    it('should find user by email', async () => {
      const userData: CreateUserData = {
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
      };

      const createdUser = await userRepository.create(userData);
      const foundUser = await userRepository.findByEmail(userData.email);

      expect(foundUser).not.toBeNull();
      expect(foundUser!._id).toBe(createdUser._id);
      expect(foundUser!.name).toBe(createdUser.name);
      expect(foundUser!.email).toBe(createdUser.email);
    });

    it('should return null for non-existent email', async () => {
      const foundUser = await userRepository.findByEmail('nonexistent@example.com');
      expect(foundUser).toBeNull();
    });

    it('should be case insensitive for email search', async () => {
      const userData: CreateUserData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };

      await userRepository.create(userData);
      const foundUser = await userRepository.findByEmail('TEST@EXAMPLE.COM');

      expect(foundUser).not.toBeNull();
      expect(foundUser!.email).toBe('test@example.com');
    });
  });

  describe('findById', () => {
    it('should find user by ID', async () => {
      const userData: CreateUserData = {
        name: 'Bob Smith',
        email: 'bob.smith@example.com',
        password: 'password123',
      };

      const createdUser = await userRepository.create(userData);
      const foundUser = await userRepository.findById(createdUser._id);

      expect(foundUser).not.toBeNull();
      expect(foundUser!._id).toBe(createdUser._id);
      expect(foundUser!.name).toBe(createdUser.name);
      expect(foundUser!.email).toBe(createdUser.email);
    });

    it('should return null for non-existent ID', async () => {
      const foundUser = await userRepository.findById('507f1f77bcf86cd799439011');
      expect(foundUser).toBeNull();
    });
  });

  describe('updateById', () => {
    it('should update user name', async () => {
      const userData: CreateUserData = {
        name: 'Original Name',
        email: 'update.test@example.com',
        password: 'password123',
      };

      const createdUser = await userRepository.create(userData);

      const updateData: UpdateUserData = {
        name: 'Updated Name',
      };

      const updatedUser = await userRepository.updateById(createdUser._id, updateData);

      expect(updatedUser).not.toBeNull();
      expect(updatedUser!.name).toBe('Updated Name');
      expect(updatedUser!.email).toBe(userData.email);
      expect(updatedUser!._id).toBe(createdUser._id);
    });

    it('should update user email', async () => {
      const userData: CreateUserData = {
        name: 'Test User',
        email: 'original@example.com',
        password: 'password123',
      };

      const createdUser = await userRepository.create(userData);

      const updateData: UpdateUserData = {
        email: 'updated@example.com',
      };

      const updatedUser = await userRepository.updateById(createdUser._id, updateData);

      expect(updatedUser).not.toBeNull();
      expect(updatedUser!.email).toBe('updated@example.com');
      expect(updatedUser!.name).toBe(userData.name);
    });

    it('should return null for non-existent ID', async () => {
      const updateData: UpdateUserData = {
        name: 'Updated Name',
      };

      const updatedUser = await userRepository.updateById('507f1f77bcf86cd799439011', updateData);
      expect(updatedUser).toBeNull();
    });
  });

  describe('deleteById', () => {
    it('should delete existing user', async () => {
      const userData: CreateUserData = {
        name: 'To Be Deleted',
        email: 'delete.test@example.com',
        password: 'password123',
      };

      const createdUser = await userRepository.create(userData);
      const deleteResult = await userRepository.deleteById(createdUser._id);

      expect(deleteResult).toBe(true);

      // Verify user is actually deleted
      const foundUser = await userRepository.findById(createdUser._id);
      expect(foundUser).toBeNull();
    });

    it('should return false for non-existent ID', async () => {
      const deleteResult = await userRepository.deleteById('507f1f77bcf86cd799439011');
      expect(deleteResult).toBe(false);
    });
  });

  describe('existsByEmail', () => {
    it('should return true for existing email', async () => {
      const userData: CreateUserData = {
        name: 'Exists User',
        email: 'exists@example.com',
        password: 'password123',
      };

      await userRepository.create(userData);
      const exists = await userRepository.existsByEmail(userData.email);

      expect(exists).toBe(true);
    });

    it('should return false for non-existent email', async () => {
      const exists = await userRepository.existsByEmail('nonexistent@example.com');
      expect(exists).toBe(false);
    });
  });

  describe('findByEmailWithPassword', () => {
    it('should find user with password field', async () => {
      const userData: CreateUserData = {
        name: 'Password Test',
        email: 'password.test@example.com',
        password: 'hashedpassword123',
      };

      await userRepository.create(userData);
      const userWithPassword = await userRepository.findByEmailWithPassword(userData.email);

      expect(userWithPassword).not.toBeNull();
      expect(userWithPassword!.name).toBe(userData.name);
      expect(userWithPassword!.email).toBe(userData.email);
      expect(userWithPassword!.password).toBe(userData.password);
    });

    it('should return null for non-existent email', async () => {
      const userWithPassword = await userRepository.findByEmailWithPassword('nonexistent@example.com');
      expect(userWithPassword).toBeNull();
    });
  });

  describe('transformToPublicUser', () => {
    it('should exclude password from public user data', async () => {
      const userData: CreateUserData = {
        name: 'Public Test',
        email: 'public.test@example.com',
        password: 'secretpassword',
      };

      const createdUser = await userRepository.create(userData);

      // Verify password is not included in public user data
      expect((createdUser as any).password).toBeUndefined();
      expect(createdUser.name).toBeDefined();
      expect(createdUser.email).toBeDefined();
      expect(createdUser._id).toBeDefined();
      expect(createdUser.createdAt).toBeDefined();
      expect(createdUser.updatedAt).toBeDefined();
    });
  });
});
