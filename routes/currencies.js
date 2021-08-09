module.exports = function (app) {
  const {
    getAllBankCurrencies,
    getBankData,
  } = require("../controllers/currenciesController");
  app.route("/currencies").get((req, res) => {
    getAllBankCurrencies().then((data) => {
      res.json({
        data,
      });
    });
  });
  app.route("/currencies/:bankName").get((req, res) => {
    const bankName = req.params.bankName;
    getBankData(bankName).then((data) => {
      res.json({
        data,
      });
    });
  });
};
