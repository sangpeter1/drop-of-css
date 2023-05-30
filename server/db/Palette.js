const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;


const Palette = conn.define("palette", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  bgColor: {
    type: STRING,
  },
  primaryColor: {
    type: STRING,
  },
  secondaryColor: {
    type: STRING,
  },
  accentColor: {
    type: STRING,
  },
});


module.exports = Palette;