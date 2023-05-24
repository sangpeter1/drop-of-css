const conn = require("./conn");
const User = require("./User");
const Component = require("./Component");
const Template = require("./Template");
const Palette = require("./Palette");

Palette.belongsTo(Template);
User.hasMany(Template);
Template.hasMany(Component);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  const [testNavbar] = await Promise.all([
    Component.create({
      type: "navbar",
      name: "test",
      htmlText: `
        <ul className="navbar">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>`,
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      ethyl,
    },
    components: {
      testNavbar,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Component,
  Template,
  Palette,
};
