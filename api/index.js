const app  = require('./src/app.js');
const PORT = 3000;
const { db } = require('./src/db.js');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  db.sync({ force: false });
});