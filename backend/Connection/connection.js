const mongoose = require("mongoose");

const connection = async (req, res) => {
  try {
    await mongoose
      .connect(
        // "mongodb+srv://manasabpmanasabp77:M141511adc@cluster4.mf1mkse.mongodb.net/"
        "mongodb+srv://manasabpmanasabp77:task@task.jkyummg.mongodb.net/task?retryWrites=true&w=majority&appName=Task"
      )
      .then(() => {
        console.log("MongoDB Connected");
      });
  } catch (error) {
    res.status(400).json({
      message: "Not Connected",
    });
  }
};

connection();
