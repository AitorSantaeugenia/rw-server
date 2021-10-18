const router = require('express').Router();

//require phone model
const Phone = require('../models/Phone.model');
//cors
var cors = require('cors');

router.get('/telefonos', cors(), (req, res, next) => {
	Phone.find()
		.then((phones) => {
			res.json(phones);
			//console.log(phones);
		})
		.catch((err) => res.json(err));
});

module.exports = router;

//  GET /api/telefonos/:phoneid -  Retrieves a specific phoneid by id
router.get('/telefonos/:id', cors(), (req, res, next) => {
	const { id } = req.params;
	//console.log(id);

	Phone.findById(id)
		.then((phone) => {
			res.json(phone);
			//console.log(phone);
		})
		.catch((err) => res.json(err));
});
