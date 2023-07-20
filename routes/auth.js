const router = require("express").Router();
const passport = require("passport");

const User = require("../model/userModel.js");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.post("/login",(req,res)=>{
    console.log(req.body);  
    const newUser = new User({
        email : req.body.email,
        password : req.body.password
    })
    
    req.login(newUser,function(err){
        if(err){
            console.log(err);
            res.status(400).json({
                success : false,
                message : err
            })
        }
        else{
            passport.authenticate("local")(req,res,function(){
                
              const userID = req.user._id;
              const name = req.user.name;

              res.status(201).json({
                    success : true,
                    message : "User Verified",
                    userID : userID,
                    name : name
                })
            })
        }
    })

})

router.get("/logout",(req,res)=>{
  req.logout(function(err){
    if(err){
      res.status(400).json({
        success : false,
        message : err
      })
    }
    else{
        console.log("logged out");
        
        res.status(201).json({
          success :true,
          message : "Logged out Successfully"
        })
    }
  });
})


router.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    const newUser = new User({ name, email });
  
    User.register(newUser, password, (err, user) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err.message });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.status(201).json({ success: true, message: "User registered successfully" });
        });
      }
    });
  });



  router.get("/check-authentication", (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false });
    }
  });

module.exports = router;