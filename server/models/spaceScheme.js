const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const { Schema } = mongoose

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  isDeleted: {type: Boolean, default: false},
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: String,
  categories: [{type: Schema.Types.ObjectId, ref: 'Category'}],
  homePageId: {
    type: Schema.Types.ObjectId,
    ref: 'Page'
  },
  blogId: Schema.Types.ObjectId,
  pages: [{type: Schema.Types.ObjectId, ref: 'Page'}],
  history: [{type: Schema.Types.ObjectId, ref: 'History'}],
  permissions: {
    users: [Schema.Types.ObjectId],
    groups: [Schema.Types.ObjectId],
    anonymous: Schema.Types.ObjectId
  },
  spaceSettings: {
    icon: {type: String, default: 'folder'},
    color: {type: String, default: '#1c80ff'}
  },
  watchedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},
{
  versionKey: false
})

spaceSchema.plugin(timestamps, {
  createdAt: {
    name: 'createdAt',
    type: Date
  },
  updatedAt: {
    name: 'updatedAt',
    type: Date
  }
})

const SpaceModel = mongoose.model('Space', spaceSchema)

module.exports = SpaceModel
