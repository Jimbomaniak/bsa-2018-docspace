const mongoose = require('mongoose')
const { Schema } = mongoose
const groupSchema = new mongoose.Schema({
  members: [Schema.Types.ObjectId],
  title: String,
  description: String
},
{
  versionKey: false
})
const Group = mongoose.model('Group', groupSchema)
module.exports.Group = Group
