const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getSignUp = (req, res) => {
  res.render("signup");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [req.body.username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).send("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await pool.query(
      "INSERT INTO users (firstname, lastname, username, password, membership) VALUES ($1, $2, $3, $4)",
      [
        req.body.firstname,
        req.body.lastname,
        req.body.username,
        hashedPassword,
      ]
    );

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};