const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String,
        description: String,
        pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }]
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
