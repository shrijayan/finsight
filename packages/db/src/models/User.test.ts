import User, { UserSchema } from './User';
import { CreateUserData } from 'lib/src/types';

describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should create a user with valid data', async () => {
      const userData: CreateUserData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.name).toBe(userData.name);
      expect(savedUser.email).toBe(userData.email.toLowerCase());
      expect(savedUser.password).toBe(userData.password);
      expect(savedUser.createdAt).toBeDefined();
      expect(savedUser.updatedAt).toBeDefined();
    });

    it('should require name field', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
      await expect(user.validate()).rejects.toMatchObject({
        errors: expect.objectContaining({
          name: expect.any(Object),
        }),
      });
    });

    it('should require email field', async () => {
      const userData = {
        name: 'Test User',
        password: 'password123',
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
      await expect(user.validate()).rejects.toMatchObject({
        errors: expect.objectContaining({
          email: expect.any(Object),
        }),
      });
    });

    it('should require password field', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const user = new User(userData);
      
      await expect(user.save()).rejects.toThrow();
      await expect(user.validate()).rejects.toMatchObject({
        errors: expect.objectContaining({
          password: expect.any(Object),
        }),
      });
    });

    it('should enforce unique email constraint', async () => {
      const userData1: CreateUserData = {
        name: 'User One',
        email: 'duplicate@example.com',
        password: 'password123',
      };

      const userData2: CreateUserData = {
        name: 'User Two',
        email: 'duplicate@example.com',
        password: 'password456',
      };

      const user1 = new User(userData1);
      await user1.save();

      const user2 = new User(userData2);
      await expect(user2.save()).rejects.toThrow();
    });

    it('should convert email to lowercase', async () => {
      const userData: CreateUserData = {
        name: 'Test User',
        email: 'TEST@EXAMPLE.COM',
        password: 'password123',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.email).toBe('test@example.com');
    });

    it('should trim whitespace from email', async () => {
      const userData: CreateUserData = {
        name: 'Test User',
        email: '  test@example.com  ',
        password: 'password123',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser.email).toBe('test@example.com');
    });

    it('should validate email format', async () => {
      const invalidEmails = [
        'invalid-email',
        'invalid@',
        '@invalid.com',
        'invalid..email@example.com',
        'invalid email@example.com',
      ];

      for (const invalidEmail of invalidEmails) {
        const userData = {
          name: 'Test User',
          email: invalidEmail,
          password: 'password123',
        };

        const user = new User(userData);
        await expect(user.validate()).rejects.toThrow();
      }
    });

    it('should enforce minimum password length', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '12345', // Only 5 characters
      };

      const user = new User(userData);
      await expect(user.validate()).rejects.toMatchObject({
        errors: expect.objectContaining({
          password: expect.any(Object),
        }),
      });
    });

    it('should enforce maximum name length', async () => {
      const userData = {
        name: 'A'.repeat(101), // 101 characters
        email: 'test@example.com',
        password: 'password123',
      };

      const user = new User(userData);
      await expect(user.validate()).rejects.toMatchObject({
        errors: expect.objectContaining({
          name: expect.any(Object),
        }),
      });
    });
  });

  describe('Schema Properties', () => {
    it('should have correct collection name', () => {
      expect(User.collection.collectionName).toBe('users');
    });

    it('should have timestamps enabled', () => {
      const schema = UserSchema;
      expect(schema.options.timestamps).toBe(true);
    });

    it('should have email index', () => {
      const emailIndex = UserSchema.indexes().find(index => 
        index[0].email === 1
      );
      expect(emailIndex).toBeDefined();
    });
  });
});
