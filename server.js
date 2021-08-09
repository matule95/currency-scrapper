const logger = require("./logger");
module.exports = {
  initializeServer: () => {
    logger.dispatch("Initializing Express Server");
    const express = require("express");
    const app = express();
    const port = 8088;
    const routes = require("./routes/currencies");
    routes(app);
    app.use((req, res) => {
      res.status(404).send({ url: `${req.originalUrl} doesn't exist` });
    });
    app.listen(port);
    logger.dispatch(`Express Server running on port:${port}`);
  },
};
