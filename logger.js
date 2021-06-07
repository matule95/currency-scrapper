module.exports = {
  dispatch: (message) => {
    console.log(`[${new Date().toLocaleString("en-GB")}] - ${message}`);
  },
};
