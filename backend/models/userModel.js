import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: false,
  },
  expiresOn: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;
