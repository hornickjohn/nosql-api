const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
