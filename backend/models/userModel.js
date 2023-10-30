const mongoose = require('mongoose')

const userModel = new mongoose.Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email : {
            type: String,
            required : true,
            unique : true,
            trim: true,
            validate: {
                validator: function (v) {
                  return /^[A-Za-z0-9._%-]+@[A-Za-z.-]+\.[A-Za-z]{2,4}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            validate(value) {
              if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
              }
            },
        },
        subscription: {
            type : String,
            ref: 'Subscription',
            default : 'free',
        },
        deactivationDate: {
            type: Date,
        },
        isActive: {
            type : Boolean,
            default : true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        }
    },
    {timestamps: true},
)

module.exports = mongoose.model("User", userModel);