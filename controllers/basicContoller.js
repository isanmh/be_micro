module.exports = {
  index: (req, res) => {
    res.json({
      msg: "Ini dari controller",
    });
  },

  basic: (req, res) => {
    res.json({
      nama: "Basic controller",
    });
  },
};
