const express = require("express");

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  return res.send("This is Home Page");
});

app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
