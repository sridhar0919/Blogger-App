var express = require('express');
var router = express.Router();
var dotenv = require('dotenv').config();
const mongoose = require('mongoose');
let homeItem = require('../models/homeItems');

mongoose.connect(process.env.MONGOURL);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get image
// router.get('/fetch-blog', async (req, res) => {
//   console.log('get items');
//   try {
//     const item = await Item.find();
//     res.status(200).json(item);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

// Post blog
router.post('/upload-blog', async (req, res) => {
  const item = new homeItem(req.body);
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get blog
router.get('/fetch-blog', async (req, res) => {
  homeItem
    .find()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Get blog by id
router.get('/get-blog/:id', async (req, res) => {
  homeItem
    .findById(req.params.id)
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
    });
});

// Get blog by category
router.post('/fetchblog-category', async (req, res) => {
  homeItem
    .find()
    .then((doc) => {
      res.send(doc.filter((blog) => blog.category == req.body.category));
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
