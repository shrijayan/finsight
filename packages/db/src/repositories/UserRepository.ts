import { User as IUser, CreateUserData, UpdateUserData } from 'lib/src/types';
import User, { UserDocument } from '../models/User';
import dbConnect from '../connection';

/**
 * UserRepository class implementing the Repository Pattern
 * All database operations for User model should go through this repository
 * Following coding standards: no direct Mongoose calls in API routes
 */
export class UserRepository {
  /**
   * Ensure database connection before operations
   * Skip connection in test environment (handled by test setup)
   */
  private async ensureConnection(): Promise<void> {
    // In test environment, connection is handled by test setup
    if (process.env.NODE_ENV === 'test' || process.env.JEST_WORKER_ID) {
      return;
    }
    await dbConnect();
  }

  /**
   * Find user by email
   * @param email - User's email address
   * @returns User document or null if not found
   */
  async findByEmail(email: string): Promise<IUser | null> {
    await this.ensureConnection();
    
    const user = await User.findOne({ email }).exec();
    if (!user) return null;

    // Transform to match shared interface (exclude password)
    return this.transformToPublicUser(user);
  }

  /**
   * Find user by ID
   * @param userId - User's MongoDB ObjectId as string
   * @returns User document or null if not found
   */
  async findById(userId: string): Promise<IUser | null> {
    await this.ensureConnection();
    
    const user = await User.findById(userId).exec();
    if (!user) return null;

    return this.transformToPublicUser(user);
  }

  /**
   * Create a new user
   * @param userData - User creation data with password
   * @returns Created user (without password)
   */
  async create(userData: CreateUserData): Promise<IUser> {
    await this.ensureConnection();
    
    const user = new User({
      name: userData.name,
      email: userData.email,
      password: userData.password, // Should be hashed before calling this method
    });

    const savedUser = await user.save();
    return this.transformToPublicUser(savedUser);
  }

  /**
   * Update user by ID
   * @param userId - User's MongoDB ObjectId as string
   * @param updateData - Partial user data to update
   * @returns Updated user or null if not found
   */
  async updateById(userId: string, updateData: UpdateUserData): Promise<IUser | null> {
    await this.ensureConnection();
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).exec();

    if (!user) return null;
    return this.transformToPublicUser(user);
  }

  /**
   * Delete user by ID
   * @param userId - User's MongoDB ObjectId as string
   * @returns true if deleted, false if not found
   */
  async deleteById(userId: string): Promise<boolean> {
    await this.ensureConnection();
    
    const result = await User.findByIdAndDelete(userId).exec();
    return !!result;
  }

  /**
   * Check if user exists by email
   * @param email - User's email address
   * @returns true if user exists, false otherwise
   */
  async existsByEmail(email: string): Promise<boolean> {
    await this.ensureConnection();
    
    const count = await User.countDocuments({ email }).exec();
    return count > 0;
  }

  /**
   * Find user by email including password (for authentication)
   * @param email - User's email address
   * @returns User document with password or null if not found
   */
  async findByEmailWithPassword(email: string): Promise<UserDocument | null> {
    await this.ensureConnection();
    
    return User.findOne({ email }).exec();
  }

  /**
   * Transform UserDocument to public User interface (exclude password)
   * @param userDoc - Mongoose UserDocument
   * @returns Public user data without sensitive fields
   */
  private transformToPublicUser(userDoc: UserDocument): IUser {
    return {
      _id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      createdAt: userDoc.createdAt,
      updatedAt: userDoc.updatedAt,
    };
  }
}

/**
 * Export singleton instance for use in API routes
 * This ensures consistent database connection handling
 */
export const userRepository = new UserRepository();
