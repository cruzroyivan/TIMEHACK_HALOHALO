const express    = require('express');
const rekuire    = require('rekuire');
const async      = require('async');
const router     = express.Router();

const TimeHackHaloHaloController = rekuire('TimeHackHaloHaloController');

router.post('/register', function(req, res, next) {
    console.log('[registerEmployee] request body', req.body);

    var _timeHackHaloHalo = new TimeHackHaloHaloController(req);
    async.auto({
        registerEmployee:		_timeHackHaloHalo.registerEmployee.bind(_timeHackHaloHalo),
    }, function(err, result) {
		if (err) return res.error(err);
		else return res.ok(result.registerEmployee);          
    });
});

module.exports = router;