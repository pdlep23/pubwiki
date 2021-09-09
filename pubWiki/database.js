const mongoose = require("mongoose");
const mySecret = process.env['mongoDBURL']
mongoose.connect(
  
mySecret
,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB...");
    }
  }
);
