const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: String
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  },
})

module.exports = mongoose.model('Comment', commentSchema)