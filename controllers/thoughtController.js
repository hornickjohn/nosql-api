const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

module.exports = {
  //send all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughts) => {
        return res.status(200).json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //send one thought by param id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (thought) => {
        if(thought) {
          res.status(200).json(thought);
        } else {
          res.status(404).json({ message: 'No thought with that ID' })
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //post req create a new thought
  createThought(req,res) {
    if(req.body.thoughtText && req.body.username && req.body.userId) {
      //create the thought
      Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username
      })
      //add the thought to the user provided via userId
      .then(thought => {
        const user = User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
        return { user, thought };
      })
      //server response
      .then(obj => {
        if(!obj.user) {
          res.status(404).json({message:'Thought created, but no user with given ID found with which to associate thought.'});
        } else {
          res.status(201).json(obj.thought);
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    } else {
      res.status(400).json({message:'Missing body data. Include thoughtText, username, and userId'});
    }
  },
  //put req update a thought
  updateThought(req,res) {
    //gather update fields from req body into update object
    const updObj = {};
    let changing = false;
    if(req.body.thoughtText) {
      updObj.thoughtText = req.body.thoughtText;
      changing = true;
    }
    if(req.body.username) {
      updObj.username = req.body.username;
      changing = true;
    }
    if(!changing) {
      //send it back if they didn't provide any fields to update in the body
      res.status(400).json({message:'Nothing to update. Provide thoughtText and/or username in req body.'});
      return;
    }
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updObj },
      { runValidators: true, new: true }
    )
    .then(thought => {
      if(!thought) {
        req.status(404).json({message:'No thought found with given ID.'});
      } else {
        req.status(200).json(thought);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //delete thought by ID and remove from user that has thought if found
  perishTheThought(req,res) {
    Thought.findOneAndRemove({ _id: req.params.id })
    .then(async thought => {
      if(!thought) {
        res.status(404).json({message:'No thought found with this ID.'});
      } else {
        await User.findOneAndUpdate(
          { thoughts: req.params.id },
          { $pull: { thoughts: req.params.id } }
        );
        res.status(200).json({message:'Thought deleted and association removed from user.'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  addReaction(req,res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
    .then(thought => {
      if(!thought) {
        res.status(404).json({message:'No thought by that ID found.'});
      } else {
        res.status(200).json(thought);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  removeReaction(req,res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
    .then(thought => {
      if(!thought) {
        res.status(404).json({message:'No thought by that ID found.'});
      } else {
        res.status(200).json(thought);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};
