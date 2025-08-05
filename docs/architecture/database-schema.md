# Database Schema

This section details the collections and document structures for our MongoDB Atlas database.

## `users` Collection

This collection stores all user account information.

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users can have the same email
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true // Will be stored as a secure hash
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
}
```

## `analysisReports` Collection

This collection stores the generated reports and links them to the user who created them.

```javascript
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Establishes a relationship to the users collection
    required: true,
    index: true // Indexed for fast lookups of a user's reports
  },
  reportTitle: {
    type: String,
    required: true
  },
  sourceDocumentCount: {
    type: Number,
    required: true
  },
  generatedData: {
    type: Object, // A flexible object to store the JSON output from Gemini
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
}
```

-----

This schema provides a solid structure for storing our application's data.
