const express    = require('express');
const rekuire    = require('rekuire');
const async      = require('async');
const router     = express.Router();

const TimeHackHaloHaloController = rekuire('TimeHackHaloHaloController');

router.post('/register', function(req, res, next) {
    console.log('[registerEmployee] \n RequestBody: ', req.body);

    var _timeHackHaloHalo = new TimeHackHaloHaloController(req);
    async.auto({
        registerEmployee:    _timeHackHaloHalo.registerEmployee.bind(_timeHackHaloHalo)
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.registerEmployee);
    });
});

router.post('/login', function(req, res, next) {
    console.log('[login] \n RequestBody: ', req.body);

    var _timeHackHaloHalo = new TimeHackHaloHaloController(req);
    async.auto({
        login:    _timeHackHaloHalo.login.bind(_timeHackHaloHalo)
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.login);
    });
});

router.post('/leave/application', function(req, res, next) {
    console.log('[login] \n RequestBody: ', req.body);

    var _timeHackHaloHalo = new TimeHackHaloHaloController(req);
    async.auto({
        addLeave:    _timeHackHaloHalo.addLeave.bind(_timeHackHaloHalo)
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.addLeave);
    });
});

router.get('/all/employee', function(req, res, next) {
    console.log('[getAllEmployee] \n GetAllEmployees: ');

    var _timeHackHaloHalo = new TimeHackHaloHaloController(req);
    async.auto({
        getAllEmployee:    _timeHackHaloHalo.getAllEmployee.bind(_timeHackHaloHalo)
    }, function(err, result) {
        if(err) return res.error(err);
        else return res.ok(result.getAllEmployee);
    });
});

module.exports = router;