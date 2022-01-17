import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
  message: [{
    content:{
      type: String,
    },
    user: [{
      type: String
    }],
    read: { type: Date }
  }],
}, {
  timestamps: true
})

const Message = mongoose.model('Message', messageSchema)
export default Message;