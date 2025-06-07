const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'minimum 4 length'],
        select: false   // this field will hide when we see the user details
    },
    phoneNumber: {
        type: Number
    },
    address: [{
        country: {
            type: String,
        },
        city: {
            type: String
        },
        address1: {
            type: String
        },
        address2: {
            type: String
        },
        zipCode: {
            type: Number
        },
        addressType: {
            type: String
        }
    }],
    role: {
        type: String,
        enum: ['user','admin','super'],
        default: "User"
    },
    avatar: {
        public_id: {
            type: String
        },
        url: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordTime: Date()
})

userSchema.pre("save", async function(next) {
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES
    })
}

userSchema.methods.comparePass = async function(enteredPass) {
    return bcrypt.compare(enteredPass,this.password)
}

module.exports = mongoose.model('User',userSchema)
