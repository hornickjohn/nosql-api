const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [ /^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Invalid email format.' ]
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

userSchema.virtual('friendCount').get(()=>{
  if(this.friends) {
    return this.friends.length;
  } 
  return 0;
});

const User = model('user', userSchema);

module.exports = User;
