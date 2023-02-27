const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  perishTheThought,
  addReaction,
  removeReaction
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:id').get(getSingleThought).put(updateThought).delete(perishTheThought);

router.route('/:id/reactions').post(addReaction);

router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;
