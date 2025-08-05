import mongoose, { Schema, Document } from 'mongoose';
import { User as IUser, CreateUserData } from 'lib/src/types';

/**
 * Database-specific User interface including password field
 * Password is stored in database but not exposed in shared frontend types
 */
interface DatabaseUser extends Omit<IUser, '_id'> {
  password: string;
}

/**
 * User document interface extending Mongoose Document
 * This combines the database User interface with Mongoose Document methods
 */
export interface UserDocument extends DatabaseUser, Document {
  _id: mongoose.Types.ObjectId;
}

/**
 * User schema definition
 * Following coding standards: camelCase collection name, proper validation, indexing
 */
const UserSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
    collection: 'users', // Following camelCase naming convention for collections
  }
);

// Email index is automatically created by unique: true in schema definition

/**
 * User model
 * Export both the model and the schema for testing purposes
 */
const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;
export { UserSchema };
