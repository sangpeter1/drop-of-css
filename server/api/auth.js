const express = require("express");
const app = express.Router();
const { User } = require("../db");
const { isLoggedIn } = require("./middleware");

module.exports = app;

app.post("/", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/register", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send(user.generateToken());
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
});

// app.get("/github", async (req, res, next) => {
//   try {
//     const { token } = await User.authenticateGithub(req.query.code);
//     console.log(token);
//     res.send(`
//       <script>
//         window.localStorage.setItem('token', '${token}');
//         window.location = '/';
//       </script>
//     `);
//   } catch (ex) {
//     next(ex);
//   }
// });

app.get("/github", async (req, res, next) => {
  try {
    const { code } = req.query;
    const token = await User.authenticateGithub(code);
    // console.log(token);
    res.send(`
      <script>
        window.localStorage.setItem('token', '${token}');
        window.location = '/';
      </script>
    `);
  } catch (ex) {
    next(ex);
  }
});

app.get("/", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

// update
app.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    const { username, password, email } = req.body;

    if (user.isOAuthUser) {
      return res.status(403).json({ error: "OAuth users cannot update their email and password." });
    }
    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = password;
    }
    if (email) {
      user.email = email;
    }

    await user.save();
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});

/* 
^ I modified the route allow user to update data separately. I left
the original route below. -mt

app.put("/", isLoggedIn, async (req, res, next) => {
  try {
    const user = req.user;
    await user.update(req.body);
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
*/

// create
app.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

//delete
app.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(204);
  } catch (ex) {
    next(ex);
  }
});
