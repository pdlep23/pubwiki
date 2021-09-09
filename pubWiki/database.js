const mongoose = require("mongoose");

mongoose.connect(
  
'mongoDBurl'
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