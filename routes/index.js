const express = require('express');
const router = express.Router();
const Crime = require('../models/crime');

/* GET home page. */
router.route('/')
	.get((req, res, next) => {
		Crime.find((error, crimesDB) => {
			if (error) {
				next(error);
			} else {
				// console.log(crimes);
				// for(var i=0; i<crimes.length; i++)
				// {
				// 	console.log(crimes[i]._id);
				// 	console.log(typeof crimes[i]._id);
				// 	console.log(crimes[i]._id.toHexString());
				// 	console.log(typeof crimes[i]._id.toHexString());
				// 	console.log("PRINTEK");
				// }
				// console.log("PRINTEK2");
				// console.log(crimes);

				var crimes = [];

				for(var i=0; i<crimesDB.length; i++)
				{
					crimes.push({
						id: crimesDB[i]._id.toHexString(),
						name: crimesDB[i].name,
						description: crimesDB[i].description,
						location: crimesDB[i].location
					})
				}
				console.log("PRINTEK3");
				console.log(crimes);
				res.render('crimes/index', {
					crimes
				});
			}
		})
	});

router.route('/crimes')
	.post((req, res, next) => {
		let location = {
			type: 'Point',
			coordinates: [req.body.longitude, req.body.latitude]
		};

		// Create a new crime with location
		const newCrime = {
			name: req.body.name,
			description: req.body.description,
			location: location
		};
		const crime = new Crime(newCrime);

		// Save the crime to the Database
		crime.save((error) => {
			if (error) {
				console.log(error)
			} else {
				res.redirect('/');
			}
		})
	});




router.route('/new')
	.get((req, res, next) => {
		res.render('crimes/new');
	});

router.route('/views/crimes/new')
	.get((req, res, next) => {
		res.render('crimes/new');
	});

router.route('/:crime_id')
	.get((req, res, next) => {
		Crime.findById(req.params.crime_id, (error, crime) => {
			if (error) {
				next(error);
			} else {
				res.render('crimes/show', {
					crime
				});
			}
		})
	})
	.post((req, res, next) => {
		Crime.findById(req.params.crime_id, (error, crime) => {
			if (error) {
				next(error);
			} else {
				crime.name = req.body.name;
				crime.description = req.body.description;
				crime.save((error) => {
					if (error) {
						next(error);
					} else {
						res.redirect('/');
					}
				})
			}
		})
	});

router.route('/:crime_id/edit')
	.get((req, res, next) => {
		Crime.findById(req.params.crime_id, (error, crime) => {
			if (error) {
				next(error);
			} else {
				res.render('crimes/update', {
					crime
				});
			}
		})
	});

router.route('/:crime_id/delete')
	.get((req, res, next) => {
		Crime.remove({
			_id: req.params.crime_id
		}, function(error, crime) {
			if (error) {
				next(error)
			} else {
				res.redirect('/')
			}
		});
	});

	router.route('/koa') 
	  	.get((req, res, next) => {
			res.render('crimes/koa');
		});

module.exports = router;