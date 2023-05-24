const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;


const Template = conn.define("template", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userId: {
	type: UUID,
	//allowNull: false,
  },
  paletteId: {
	type: UUID,
	//allowNull: false,
  },
  componentId: {
	type: UUID,
	//allowNull: false,
  },
});


module.exports = Template;