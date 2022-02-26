const { json } = require('express');
var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId

router.get('/', function(req, res, next) {
  res.render('index', {title: "Hello, Working"})
})

router.get('/appointments', (req, res, next) => {
  req.collection.find({})
  .toArray()
  .then(result => res.json(result))
  .catch(error => res.send(error))
})

router.post('/appointments', (req, res, next) => {
  const { appointDate, name, email } = req.body;
  if(!appointDate || !name || !email) {
    return res.status(400).json({
      message: 'Fields cannot be empty',
    });
  }
  const payload = {appointDate, name, email}
  req.collection.insertOne(payload)
  .then(result => res.json(result.ops[0]))
  .catch(error => res.send(error));
});

router.delete('/appointments/:id', (req, res, next) => {
  const id = req.params
  const _id = ObjectId(id)

  req.collection.deleteOne({ _id })
  .then(result => res.json(result))
  .catch(error => res.send(error))
})


module.exports = router;
