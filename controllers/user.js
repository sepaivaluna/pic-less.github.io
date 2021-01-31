const showProfile = (req, res) => {
  res.render("user/profile", {
    user: req.user,
  });
};

const login = (req, res) => {
  res.render("user/login", {
    user: req.user,
  });
};

module.exports = {
  login,
  profile: showProfile,
};
