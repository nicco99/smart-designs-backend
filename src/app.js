const express = require("express");
const app = express();
const morgan = require("morgan");
const designsRouter = require("./designs/designs.router");

app.use(express.json());
app.use(morgan("dev"));
app.use("/designs", designsRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
