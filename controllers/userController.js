const { User, Thought } = require('../models');

module.exports = {
  //send all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then(async (users) => {
        return res.status(200).json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //send one user by param id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.id })
      .select('-__v')
      .then(async (user) => {
        if(user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'No user with that ID' })
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //post req create a new user
  createUser(req,res) {
    if(req.body.username && req.body.email) {
      //create the user
      User.create({
        email: req.body.email,
        username: req.body.username
      })
      //server response
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    } else {
      res.status(400).json({message:'Missing body data. Include email and username'});
    }
  },
  //put req update a user
  updateUser(req,res) {
    //gather update fields from req body into update object
    const updObj = {};
    let changing = false;
    if(req.body.email) {
      updObj.email = req.body.email;
      changing = true;
    }
    if(req.body.username) {
      updObj.username = req.body.username;
      changing = true;
    }
    if(!changing) {
      //send it back if they didn't provide any fields to update in the body
      res.status(400).json({message:'Nothing to update. Provide email and/or username in req body.'});
      return;
    }
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updObj },
      { runValidators: true, new: true }
    )
    .then(user => {
      if(!user) {
        res.status(404).json({message:'No user found with given ID.'});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //delete user by ID and remove all its thoughts
  deleteUser(req,res) {
    User.findOneAndRemove({ _id: req.params.id })
    .then(async user => {
      if(!user) {
        res.status(404).json({message:'No user found with this ID.'});
      } else {
        await user.thoughts.forEach(async thought => {
          await Thought.findOneAndRemove({ _id: thought._id });
        });
        res.status(200).json({message:'User and associated thoughts removed.'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  addFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then(user => {
      if(!user) {
        res.status(404).json({message:'User not found.'});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  removeFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: { _id: req.params.friendId } } },
      { runValidators: true, new: true }
    )
    .then(user => {
      if(!user) {
        res.status(404).json({message:'User not found.'});
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};
