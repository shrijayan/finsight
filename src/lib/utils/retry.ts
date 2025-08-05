/**
 * Retry utility with exponential backoff
 * Used for handling transient failures in external API calls
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry on the last attempt
      if (attempt < maxRetries - 1) {
        // Exponential backoff: delay increases exponentially with each retry
        const delay = baseDelay * Math.pow(2, attempt);
        
        // Add some jitter to prevent thundering herd
        const jitter = Math.random() * 0.1 * delay;
        const totalDelay = delay + jitter;
        
        console.warn(`Operation failed (attempt ${attempt + 1}/${maxRetries}), retrying in ${Math.round(totalDelay)}ms:`, error instanceof Error ? error.message : String(error));
        
        await new Promise(resolve => setTimeout(resolve, totalDelay));
      }
    }
  }

  console.error(`Operation failed after ${maxRetries} attempts:`, lastError);
  throw lastError;
}

/**
 * Retry utility for rate-limited operations
 * Includes specific handling for rate limit errors
 */
export async function retryWithRateLimit<T>(
  operation: () => Promise<T>,
  maxRetries: number = 5,
  baseDelay: number = 2000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on the last attempt
      if (attempt < maxRetries - 1) {
        let delay = baseDelay * Math.pow(2, attempt);
        
        // Check if this is a rate limit error
        if (error.statusCode === 429 || error.message?.includes('rate limit')) {
          // For rate limit errors, use longer delays
          delay = Math.max(delay, 5000 * (attempt + 1));
        }
        
        // Add jitter
        const jitter = Math.random() * 0.2 * delay;
        const totalDelay = delay + jitter;
        
        console.warn(`Rate-limited operation failed (attempt ${attempt + 1}/${maxRetries}), retrying in ${Math.round(totalDelay)}ms:`, error.message);
        
        await new Promise(resolve => setTimeout(resolve, totalDelay));
      }
    }
  }

  console.error(`Rate-limited operation failed after ${maxRetries} attempts:`, lastError);
  throw lastError;
}

/**
 * Simple retry utility without exponential backoff
 * Used for operations that need consistent retry intervals
 */
export async function retryWithFixedDelay<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      
      // Don't retry on the last attempt
      if (attempt < maxRetries - 1) {
        console.warn(`Operation failed (attempt ${attempt + 1}/${maxRetries}), retrying in ${delay}ms:`, error instanceof Error ? error.message : String(error));
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.error(`Operation failed after ${maxRetries} attempts:`, lastError);
  throw lastError;
}
