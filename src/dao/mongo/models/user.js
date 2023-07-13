import { Schema, model } from "mongoose";

const userCollection = 'users'

const userSchema = Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    roll:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

export default model(userCollection, userSchema)