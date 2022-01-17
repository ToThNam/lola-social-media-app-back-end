import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
  users: [{
    user: {
      type: String,
      ref: 'User'
    }, 
    message: {
      type: String,
      ref: 'Message'
    },
  }],
})

const Chat = mongoose.model('Chat', chatSchema)
export default Chat;