const {Router} = require('express');
const { Review} = require('../../models');

const router = new Router();


router.get('/', (req, res) => {

  try {
    if (req.query.major) {
      if(req.query.verified){
        res.status(200).json(Review.get().filter(review => review.major === req.query.major && review.verified.toString() === req.query.verified));
      } else {
        res.status(200).json(Review.get().filter(review => review.major === req.query.major));
      }
    } else {
      if(req.query.verified){
        res.status(200).json(Review.get().filter(review.verified.toString() === req.query.verified));
      } else {
        res.status(200).json(Review.get());
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/:id', (req, res) => {
  try {
    const reviewToSend = Review.getById(req.params.id);
    res.status(200).json(reviewToSend);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

router.post('/', (req, res) => {
  try {
    const review = Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.put('/:id', (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json(Review.update(req.params.id, req.body));
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else if (err.name === 'ValidationError') {
      res.status(400).json(err.extra);
    } else {
      res.status(500).json(err);
    }
  }
});

router.delete('/:id', (req, res) => {
  try {
    Review.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    if (err.name === 'NotFoundError') {
      res.status(404).end();
    } else {
      res.status(500).json(err);
    }
  }
});

module.exports = router;
