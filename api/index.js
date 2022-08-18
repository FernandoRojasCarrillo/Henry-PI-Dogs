// const app  = require('./src/app.js');
// const { db } = require('./src/db.js');
const express = require('express');
const app = express();

app.get('/', (req,res) => {
  res.send('<h1>Hello World</h1>')
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
  // db.sync({ force: false });
});