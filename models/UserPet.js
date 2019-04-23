const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userPetSchema = new Schema({
  name: String,
  color: String,
  age: Number,
  avatarUrl: { type: String, default: 'images/default-avatar.png' }, // default image if none uploaded
  location: {
    address: String,
    city: String
  },
  countryCode: { type: String, match: /^[A-Z]{2}$/ },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const UserPet = mongoose.model('UserPet', userPetSchema);
module.exports = UserPet;