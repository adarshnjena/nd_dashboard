import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, // Ensure uniqueness
    required: true, // Make it required
    trim: true, // Remove leading and trailing whitespace
    lowercase: true, // Convert to lowercase
    validate: {
      validator: function (value) {
        // Use a regular expression to check for no spaces
        return /^[a-z0-9_]+$/.test(value);
      },
      message:
        "Username must contain only lowercase letters, numbers, and underscores (no spaces).",
    },
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    max: 50,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Password must be at least 8 characters long and contain at least one uppercase letter,
        // one lowercase letter, one number, and one special character.
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value);
      },
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
