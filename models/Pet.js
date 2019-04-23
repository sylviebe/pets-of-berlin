const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PetSchema = new Schema(
    {
        name: String,
        color: String,
        age: Number,
        owner: { type: Schema.Types.ObjectId, ref: 'User' },
        avatarUrl: { type: String, default: 'images/default-avatar.png' }, // default image if none uploaded
        //?  --- location: { type: { type: String }, coordinates: [Number] }
        //});
        location: {
            lat: Number,
            lng: Number,
            address: String,
            city: String
        },
        countryCode: { type: String, match: /^[A-Z]{2}$/ }
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Pet = mongoose.model('Pet', PetSchema);
module.exports = Pet;
