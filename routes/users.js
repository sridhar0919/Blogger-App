var express = require('express');
var router = express.Router();
var dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { createIndexes } = require('../models/items');
let Item = require('../models/items');

mongoose.connect(process.env.MONGOURL);

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Sign-in
router.post('/add-user', async (req, res) => {
  var existUser = 'no';
  const users = await Item.find().then((doc) => {
    return doc;
  });
  try {
    users.map((user) => {
      if (user.userDetails.email === req.body.userDetails.email) {
        existUser = 'yes';
        res.send({ message: 'User exists', _id: user._id });
      }
    });
    if (existUser === 'no') {
      const item = new Item(req.body);
      item.save();
      res.status(201).json(item);
    }
  } catch (error) {
    res.send('User already exists');
  }
});

// Add-blog
router.post('/add-blog/:id', async (req, res) => {
  const user = await Item.findById(req.params.id).then((doc) => {
    return doc;
  });
  // console.log(user);
  try {
    if (user) {
      user.listOfBlogs.push(req.body);
      user.save();
    }
  } catch (error) {
    res.send('Error!');
  }
});

// Remove blog
router.put('/delete-blog/:id', async (req, res) => {
  const user = await Item.find({ _id: req.params.id }).then((doc) => {
    return doc;
  });

  const newBlogs = user[0].listOfBlogs.filter(
    (blog, index) => blog.blogTitle != req.query.blogTitle
  );

  Item.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      listOfBlogs: newBlogs,
    }
  )
    .then((doc) => res.send('Blog Deleted'))
    .catch((err) => res.send('Error'));

  // try {
  //   user[0].listOfBlogs.map((blog, index) => {
  //     if (blog.blogTitle == req.query.blogTitle) {
  //       user[0].listOfBlogs.splice(index, 1);
  //       user.save();
  //     }
  //   });

  //   res.send({ message: 'Blog deleted successfully' });
  // } catch (error) {
  //   res.send('Error!!');
  // }
});

// fetch all blogs
router.get('/fetch-userblog/:id', async (req, res) => {
  Item.find({
    _id: req.params.id,
  })
    .then((doc) => {
      res.send(doc[0].listOfBlogs);
    })
    .catch((err) => {
      res.send(err);
    });
});

// fetch a blog from a user
router.get('/fetch-currentblog/:id', async (req, res) => {
  Item.find({
    _id: req.params.id,
  })
    .then((doc) => {
      console.log(doc);
      res.send(
        doc[0].listOfBlogs.find((blog) => blog.blogTitle == req.query.title)
      );
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
