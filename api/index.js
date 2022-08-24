const app  = require('./src/app.js');
const { db } = require('./src/db.js');
const axios = require("axios");

// axios.defaults.baseURL = process.env.API_DOGS_BASE_URL || "http://localhost:3001";


app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT || 3001}`);
  db.sync({ force: false });
});