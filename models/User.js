import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  firstName : {
    type: String,
  },
  lastName : {
    type: String,
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
