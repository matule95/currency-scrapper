const { getCurrenciesData, getSelectedData } = require("../firebaseOperations");
module.exports = {
  getAllBankCurrencies() {
    return new Promise((resolve, reject) => {
      getCurrenciesData().then((data) => {
        const sanitizedData = [];
        Object.values(data).forEach((bank) => {
          const index = Object.values(bank).length;
          const obj = {
            bankName: Object.values(bank)[index - 1].bankName,
            currencies: Object.values(bank)[index - 1].currencies,
          };
          sanitizedData.push(obj);
        });
        resolve(sanitizedData);
      });
    });
  },
  getBankData(bankName) {
    return new Promise((resolve, reject) => {
      getSelectedData(bankName).then((data) => {
        const sanitizedData = [];
        Object.values(data).forEach((bank) => {
          const obj = {
            date: bank.date,
            bankName: bank.bankName,
            currencies: bank.currencies,
          };
          sanitizedData.push(obj);
        });
        resolve(sanitizedData);
      });
    });
  },
};
