import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName : {
    type: String,
    required: true
  },
  lastName : {
    type: String,
    required: true
  },
  image: {
    type: String,
  },
  status: {
    isActiveOrInCall: {
      type: String,
      default:'online',
    },
    date: {
      type: Date
    }
  },
  friends: [{
    user: {
      type: String
    },
    status: {
      type: Boolean
    }
  }],
  requests: [{
    type: String
  }],
  chats: {
        type: String,
        ref: 'Chat'
  },
},
{ timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User
