const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;

const Component = conn.define("component", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  type: {
    type: STRING,
  },
  name: {
    type: STRING,
  },
  htmlText: {
    type: TEXT,
  },
});

module.exports = Component;
