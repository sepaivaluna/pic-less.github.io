const { User, Post } = require('../models')

const showHome = (req, res) => {

    Post.find({}).populate('user').exec((err,posts) => {
        console.log(req.session.passport.user)
    })
    
  res.render("home/index", {
    user: req.user,
  });
};

module.exports = {
  show: showHome,
};
