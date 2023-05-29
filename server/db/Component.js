const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, JSON } = conn.Sequelize;

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
  htmlStyle: {
    type: JSON,
  },
});

module.exports = Component;
