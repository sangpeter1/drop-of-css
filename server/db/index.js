const conn = require("./conn");
const User = require("./User");
const Component = require("./Component");
const Template = require("./Template");
const Palette = require("./Palette");
const components = require("./components");

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

  const [navbar, form] = await Promise.all([
    components.map((component) => {
      Component.create(component);
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      ethyl,
    },
    components: {
      navbar,
      form,
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
