/**
 * Test script to verify MongoDB Atlas connection
 * Run this to test the actual database connection with production credentials
 */
import dbConnect from './connection';
import { userRepository } from './repositories/UserRepository';

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    
    // Test database connection
    await dbConnect();
    console.log('✅ Database connection successful!');
    
    // Test a simple database operation (just check if we can query)
    const exists = await userRepository.existsByEmail('test-connection@example.com');
    console.log('✅ Database query successful!');
    
    console.log('🎉 MongoDB Atlas connection test completed successfully!');
    console.log('📊 Database: bankStatementAnalyzer');
    console.log('🔗 Connection verified and ready for production use');
    
  } catch (error) {
    console.error('❌ Database connection test failed:');
    console.error(error);
    process.exit(1);
  } finally {
    // Close the connection
    process.exit(0);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testConnection();
}

export { testConnection };
