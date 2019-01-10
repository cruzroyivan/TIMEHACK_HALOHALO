'use strict';

const rekuire = require('rekuire');
const generatePassword = require("password-generator");
const TimeHackHaloHaloMySQL = rekuire('TimeHackHaloHaloMySQL');

function TimeHackHaloHaloController(req, res) {
	this.req = req;
	this.res = res;
};

TimeHackHaloHaloController.prototype.registerEmployee = function(cb, result) {

    //Generate Password
    let maxLength = 18;
    let minLength = 12;
    let uppercaseMinCount = 3;
    let lowercaseMinCount = 3;
    let numberMinCount = 2;
    let UPPERCASE_RE = /([A-Z])/g;
    let LOWERCASE_RE = /([a-z])/g;
    let NUMBER_RE = /([\d])/g;
    let NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;
    
    function isStrongEnough(password) {
        let uc = password.match(UPPERCASE_RE);
        let lc = password.match(LOWERCASE_RE);
        let n = password.match(NUMBER_RE);
        let nr = password.match(NON_REPEATING_CHAR_RE);
        return password.length >= minLength &&
        !nr &&
        uc && uc.length >= uppercaseMinCount &&
        lc && lc.length >= lowercaseMinCount &&
        n && n.length >= numberMinCount;
    }

    function customPassword() {
        let password = "";
        let randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
        while (!isStrongEnough(password)) {
        password = generatePassword(randomLength, false, /[\w\d\?\-]/);
        }
        return password;
    }

    let generatedPassword = customPassword();
    
    let data = {
        employee_id: req.body.id,
        employee_lastName: req.body.name.last,
        employee_firstName: req.body.name.first,
        employee_middleName: req.body.name.middle,
        employee_department: req.body.department,
        employee_designation: req.body.designation,
        employee_mobileNumber: req.body.mobileNumber,
        employee_email: req.body.email,
        employee_password: generatedPassword
    };

	let query = `INSERT INTO halohalo_employee SET ?`;
	let registerEmployee = TimeHackHaloHaloMySQL.execute(query, data);
	registerEmployee.then((employee)=>{
		return cb(null, {
            message: "Succesfully registered.",
            employeeId: req.body.id,
            password: generatedPassword
		});	
	}).catch((error)=>{
		Logger.log('error', TAG + ACTION, error);
		return cb(Errors.raise('INTERNAL_SERVER_ERROR', error));  
	});
};

module.exports = TimeHackHaloHaloController;