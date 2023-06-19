const app = require("./app");
const { syncAndSeed } = require("./db");
app.engine("html", require("ejs").renderFile); //OAuth

//OAuth github only locally, when deploying add client id and secret env variable
try {
  require("../env.js");
} catch (ex) {
  // console.log('didnt work');
  console.log(ex);
}

// console.log(process.env.client_id);

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, () => console.log(`listening on port ${port}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
