const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT } = conn.Sequelize;

const Template = conn.define("template", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
  },
  userId: {
    type: UUID,
    //allowNull: false,
  },
  /* paletteId: {
	type: UUID,
	//allowNull: false,
  },*/
  componentId: {
    type: UUID,
    //allowNull: false,
  },
  htmlText: {
    type: TEXT,
  },
  type: {
    type: STRING,
  },
});

module.exports = Template;

/*

htmlText previewPane.js line 17





*/
