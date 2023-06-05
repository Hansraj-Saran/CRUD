const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const pattern = /^[0-9]{10}$/;
        return pattern.test(value);
      },
      message: 'Invalid Phone number'
    }
  },
  profileImage: {
    type: String,
    required: true,
    unique: true
  }
});

userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = User;
