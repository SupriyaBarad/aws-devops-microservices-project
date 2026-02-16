const express = require("express");
const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "OK from EKS" });
});

app.listen(3000, () => console.log("Backend running"));
