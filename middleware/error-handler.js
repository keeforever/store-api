const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    msg: "Something went to wrong Please try again !!!",
  });
};

module.exports = errorHandler;
