module.exports = function () {
  return function (req, res, next) {
    res.retData = { serverReturn: "Successfull test!!" };
    next();
  };
};
