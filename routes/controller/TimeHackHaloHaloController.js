'use strict';

const rekuire = require('rekuire');
const async   = require('async');
const generatePassword = require("password-generator");
const cryptoJs = require("crypto-js");
const TimeHackHaloHaloMySQL = rekuire('TimeHackHaloHaloMySQL');

function TimeHackHaloHaloController(req, res) {
	this.req = req;
	this.res = res;
};

TimeHackHaloHaloController.prototype.registerEmployee = function(cb, result) {
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
    let encryptPassword = cryptoJs.AES.encrypt(generatedPassword, generatedPassword);
    let data = {
        employee_id: this.req.body.id,
        employee_lastName: this.req.body.name.last,
        employee_firstName: this.req.body.name.first,
        employee_middleName: this.req.body.name.middle,
        employee_department: this.req.body.department,
        employee_designation: this.req.body.designation,
        employee_mobileNumber: this.req.body.mobileNumber,
        employee_email: this.req.body.email,
        employee_password: encryptPassword.toString()
    };

	let query = `INSERT INTO halohalo_employee SET ?`;
	let registerEmployee = TimeHackHaloHaloMySQL.execute(query, data);
	registerEmployee.then((employee)=>{
		return cb(null, {
            message: "Succesfully registered.",
            employeeId: this.req.body.id,
            password: generatedPassword
		});
	}).catch((error)=>{
        console.log('Error: ', error.sqlMessage);
		return cb({
            errors:[{
                code: error.code,
                message: error.sqlMessage
            }]
        });
	});
};

TimeHackHaloHaloController.prototype.login = function(cb, result) {
    let email = this.req.body.email;
    let password = this.req.body.password;

    async.auto({
        getEmail: function(callback) {
            let query = `SELECT * FROM halohalo_employee WHERE employee_email = ?`;
            let registeredEmployee = TimeHackHaloHaloMySQL.execute(query, [email]);
            registeredEmployee.then((employee)=>{
                callback(null, {
                    loginEmail: email,
                    loginPassword: password,
                    records: employee
                });
            }).catch((error)=>{
                console.log('Error: ', error.sqlMessage);
                callback({
                    errors:[{
                        code: error.code,
                        message: error.sqlMessage
                    }]
                });
            });
        },
        decryptPassword: ['getEmail', function(res, callback) {
            let getEmailResponse = res.getEmail;
            let bodyPassword = getEmailResponse.loginPassword;
            let recordPassword = getEmailResponse.records[0].employee_password;

            let bytes  = cryptoJs.AES.decrypt(recordPassword, bodyPassword);
            let decryptedData = bytes.toString(cryptoJs.enc.Utf8);

            if (decryptedData == bodyPassword) {
                callback(null, {
                    message: "Password match."
                })
            } else {
                callback({
                    errors: [{
                        code: "000",
                        message: "Password doesn't match."
                    }]
                })
            }
        }]
    }, function(err, results) {
        if(err) {
          return cb(err);
        } else {
          let response = results;
          return cb(null, response.decryptPassword);
         }
    });
};

TimeHackHaloHaloController.prototype.addLeave = function(cb, result) {
    let data = {
            leaves_applicationDate: new Date(),
            leaves_employeeId: this.req.body.employeeId,
            leaves_type: this.req.body.type,
            leaves_fromDate: this.req.body.fromDate,
            leaves_toDate: this.req.body.toDate,
            leaves_fromTime: this.req.body.fromTime,
            leaves_toTime: this.req.body.toTime,
            leaves_details: this.req.body.details,
            leaves_totalnumOfdays: this.req.body.totalNumOfDays,
            leaves_status: "Pending",
            leaves_approvedBy: ""
    };

	let query = `INSERT INTO halohalo_leaves SET ?`;
	let addLeave = TimeHackHaloHaloMySQL.execute(query, data);
	addLeave.then((employee)=>{
		return cb(null, {
            message: "Leave succesfully added."
		});
	}).catch((error)=>{
        console.log('Error: ', error.sqlMessage);
		return cb({
            errors:[{
                code: error.code,
                message: error.sqlMessage
            }]
        });
	});
};

TimeHackHaloHaloController.prototype.getAllEmployee = function(cb, result) {
	let query = `SELECT * FROM halohalo_employee`;
	let getAllEmployee = TimeHackHaloHaloMySQL.execute(query, null);
	getAllEmployee.then((employee)=>{
        let emp = [];
        employee.forEach(function(index){
            emp.push({
                id: index.id,
                employeeId: index.employee_id,
                department: index.employee_department,
                designation: index.employee_designation,
                name:{
                    last: index.employee_lastName,
                    first: index.employee_firstName,
                    middle: index.employee_middleName,
                },
                mobileNumber: index.employee_mobileNumber,
                emailAddress: index.employee_email,
                password: index.employee_password
            });
        });
		return cb(null, {
            records: emp
		});
	}).catch((error)=>{
        console.log('Error: ', error.sqlMessage);
		return cb({
            errors:[{
                code: error.code,
                message: error.sqlMessage
            }]
        });
	});
};

module.exports = TimeHackHaloHaloController;