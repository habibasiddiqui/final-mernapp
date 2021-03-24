const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require("../../models/users.js");
const jwt = require('jsonwebtoken');
const session = require('express-session');

const dotenv = require('dotenv');
dotenv.config();


//Get all users
router.get("/", async (req, res) => {
  try {

    const users = await User.find();
    // console.log(users);
    res.status(200).json({ success: true, data: users });
  } 
  catch (e) {
    res.status(404).json({ success: false, error: err.message });
  }
});




// add single user
router.post("/", async (req, res) => {
  let {email, name, pwd} = req.body;
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pwd, salt);
  let newUser = { pwd: hash, email, name }
  try{
    User.findOne({email: req.body.email})
    .then(user => { 
      if(!user)
      {
        User.create(newUser)
        .then (user => {
          res.json({
            status: 201,
            success: true,
            dbid: user._id,
            msg: 'user',
          });
        })
        // .catch(err => {
        //   console.log(err)
        //   res.json({
        //   success: false,
        //   status: 404,
        //   unique: false,
        //   errorMsg: 'user not created', 
        //   })
        // })
      }
    })
    .catch(err => {
      console.log(err)
      res.json({ 
      status: 404,
      errorMsg: 'email already exists', 
      })
    })
    

  } // try end
  catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }

});






//Get single user
router.get('/:id', async (req, res) => {
    try {
    const userOne = await User.findById(req.params.id);
    res.status(200).json({ success: true, data: userOne,  });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }

  
});





// delete single user
router.delete('/:id', async (req, res) => {
  try {
    const delOne = await User.findByIdAndRemove(req.params.id);
      res.json({
        success: true,
        status: 200,
        del: delOne,
      })
      console.log("Removed User : ", delOne);
 
} catch (err) {
  res.json({ 
    success: false,
    status: 400,
    error: err.message });
}

});





// update single user
router.post('edit/:id', async (req, res) => {
  console.log('edit',  req.body)
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(pwd, salt);
  let updated = { pwd: hash,  name: req.body.name }
  try {
    let user = await User.findByIdAndUpdate(req.params.id, updated);
    res.json({
      success: true,
      status: 200, //ok
      data: user,
      msg: 'edited successfully'
  })
  }
  catch(err) {
    res.json({ 
      success: false,
      status: 400,
      error: err.message });
  }

});





// SIGNIN
router.post('/login', async (req, res) => {
  let { pwd, email } = req.body;
  // console.log(req.body)
  try {
    User.findOne({ email })
      .then(user => {
        // console.log(user)
        bcrypt.compare(pwd, user.pwd).then((isMatch) => {
          if (!isMatch) 
            return res.json({ status: 400, errorMsg: "Invalid password" });
          else {
            jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY, function (err, token) {
              let onlineUser = { id: user._id, name: user.name, email: user.email, 
                role: user.role, token };
              if(err) return res.json({
                status: 400,
                msg: 'Token generation failed'
              })
              else {
                res.json({
                  status: 200,
                  data: onlineUser,
                  msg: "login success",                  
                })
              }
            })
            

          }   // outer else
        })  // bcypt.then
      })  // findOne then
      .catch((error) => {
        console.log(error);
        res.json({
          status: 404,
          errorMsg: "Email not found",                  
        })
      })  // findOne catch
  }   // try
  catch (error) {
    console.log(error);
    // res.json({
    //   status: 404,
    //   msg: "Email not found",                  
    // })
  }
} // POST
)




// SIGNOUT
// router.post('/logout',(req,res)=>{
router.delete('/logout',(req,res)=>{
    console.log(req.session);


  // req.session = '';
  // res.clearCookie('session-id');
  // res.json({
  //   status: 200,
  //   msg: 'logout successful'
  // })


  req.session.destroy( err => {
    if (err)
    {
      res.json({
        status: 400,
        msg: 'logout failed'
      })
    } //IF
    else 
    {
      res.clearCookie('session-id');
      res.json({
        status: 200,
        msg: 'logout successful'
      })
    } //ELSE
  }) //SESSION.DESTROY

}) //POST

module.exports = router;
