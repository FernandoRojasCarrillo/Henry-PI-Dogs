const app  = require('./src/app.js');
const PORT = 3000;
const { sequelize } = require('./src/db.js');

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  sequelize.sync({ force: true });
});