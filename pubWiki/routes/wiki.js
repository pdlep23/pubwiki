const express = require ('express');
const Wiki = require('../models/wiki.js');

const router = express.Router();


//GET request for the search, filter based on title and html
//send array to client
router.get("/search/:term", (req, res) => {
  var filter = {
    $or: [
      { title: { $regex: req.params.term, $options: "i" } },
      { html: { $regex: req.params.term, $options: "i" } }
    ]
  }

  Wiki.find(filter).exec((err, result) => { 
		if(!err) {
    res.status(200).send(result);
  } else {
		console.log(err);
		res.status(400).send(err);
		}
	})
})

//GET request for the existing post, find based on urlName
router.get('/post/:urlName', (req, res) => {
	let urlName = req.params.urlName;
	Wiki.find({urlName: urlName}).exec((err, result) => {
    if(!err) {
      res.status(200).send(result);
    } else {
      console.log(err);
      res.status(400).send(err);
    }
  })
});

//GET request for existing page, find based on urlName
//search based on ID and update pageview
router.get('/:urlName', (req, res) => {
  let urlName = req.params.urlName;
  Wiki.findOneAndUpdate({urlName : urlName}, {$inc:{pageViews: 1}}, { new: true }).exec((err, result) => {
		if(!err){
				res.status(200).send(result);
			}
			else{
				res.status(400).send("No URL");
			}
	})
});


//POST request,retrieve wiki info and send result
router.post('/post', (req, res) => {
	let newWiki = new Wiki(req.body);
	newWiki.save((err, result) =>{
		if(!err){
			res.status(201).send(result);
		} else {
			res.status(400).send(err);
		}
	})
});

//PUT request, get the urlName and find in the database and 
//update, if password is correct, update all
//send to the database
router.put('/post/:urlName', (req, res) => {
		let urlName = req.params.urlName;
	  Wiki.findOneAndUpdate({urlName: urlName}, {new: true}).exec(function(err, result) {
		if(result){
			if(result.password == req.body.password) {
				result.title = req.body.title;
				result.category = req.body.category;
				result.author = req.body.author;
				result.html = req.body.html;
				result.updatedDate = req.body.updatedDate;
				result.save(function(err, result){
					if(!err) {
					res.status(200).send(result);
					} else {
						res.status(400).send(err.message);
					}
				})
			}else{
				res.status(400).send("Sorry, invalid password.");
			}
		}
		else{
			res.status(400).send("Something happened");
		}		
		})
});





module.exports = router;