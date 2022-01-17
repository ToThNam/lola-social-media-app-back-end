import mongoose from "mongoose"

const URL = 'http://localhost:27017/lola-db'

mongoose.connect(URL, {
  userNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection

connection.on('error',() => {
  console.log('Error on mongoose');
})

connection.on('connected',() => {
  console.log('Mongoose was conected');
})

connection.on('disconnected',() => {
  console.log('Mongoose was disconnected');
})

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('Mongoose connection was terminated');
  })
})

export default mongoose