const express = require("express");
const postRouter = express.Router();
const Post = require("../../models/posts.js");
const auth = require('../../middleware/authorization.js');

//Get all posts
postRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    // console.log(posts);
    res.status(200).json({ success: true, data: posts });
  } 
  catch (e) {
    res.status(404).json({ success: false, error: err.message });
  }
});

// add single post
postRouter.post("/", auth, async (req, res) => {
  try{
      const post = await Post.create(req.body);
      res.status(201).json({
      success: true,
      dbid: post._id,
      data: post
    });
  } 
  catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }

});

// Get single post
postRouter.get('/:id', async (req, res) => {
    try {
    const postOne = await Post.findById(req.params.id);
    res.status(200).json({ success: true, data: postOne });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }

});



// Delete single post
postRouter.delete('/:id', async (req, res) => {
  try {
    const delOne = await Post.findByIdAndRemove(req.params.id);
      // if (err){ 
      //     console.log(err) 
      // } 
      // else{ 
      //     console.log("Removed User : ", docs); 
      // } 
      res.json({
        success: true,
        status: 200,
        del: delOne,
      })
      console.log("Removed Post : ", delOne);
 
} catch (err) {
  res.json({ 
    success: false,
    status: 400,
    error: err.message });
}

});




// update post
postRouter.post('edit/:id', async (req, res) => {
  console.log('edit post', req.body);
  // let post = req.body;

  Post.findById(req.params.id, function(err, post) {
    if (!post)
        res.status(404).send("data is not found");
    else
        post._id = req.body._id;
        post.title = req.body.title;
        post.body = req.body.body;
        post.image = req.body.image;
        post.createdAt = req.body.createdAt;
        post.updatedAt = req.body.updatedAt;

        post.save().then(post => {
            res.json('post updated!');
        })
        .catch(err => {
            res.status(400).send("Update not possible");
        });
});

  // Post.findById(req.params.id)
  // .then(post => {
  //   post._id = req.body._id;
  //   post.title = req.body.title;
  //   post.body = req.body.body;
  //   post.image = req.body.image;
  //   post.createdAt = req.body.createdAt;
  //   post.updatedAt = req.body.updatedAt;
  //   // post.title = req.body.title;
  //   res.json({
  //     success: true,
  //       status: 202,
  //       data: post
  //   })
  // })
  // .catch(err => {
  //   res.json({
  //     success: false,
  //     status: 400,
  //     error: err.message 
  //   })
  // })



  // let id='600e6096ec6ddd1450f0cc87';
  // try{
  //   const post = await Post.findByIdAndUpdate(id, req.body);
  // res.json({
  //     success: true,
  //     status: 200, //ok
  //     data: post,
  //     msg: 'updated successfully'
  // })
  // }
  // catch(err) {
  //   res.json({ 
  //     success: false,
  //     status: 400,
  //     error: err.message });
  // }
  
});



module.exports = postRouter;
