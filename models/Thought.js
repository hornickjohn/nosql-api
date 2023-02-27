const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: date => date.toLocaleDateString("en-US", { month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})
    },
    username: {
      type: String,
      required: true
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    id: false
  }
);

thoughtSchema.virtual('reactionCount').get(()=>{
  if(this.reactions) {
    return this.reactions.length;
  }
  return 0;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
