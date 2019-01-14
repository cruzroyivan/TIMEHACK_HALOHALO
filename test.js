var cryptoJs = require("crypto-js");
// const generatePassword = require("password-generator");

// //Generate Password
// let maxLength = 18;
// let minLength = 12;
// let uppercaseMinCount = 3;
// let lowercaseMinCount = 3;
// let numberMinCount = 2;
// let UPPERCASE_RE = /([A-Z])/g;
// let LOWERCASE_RE = /([a-z])/g;
// let NUMBER_RE = /([\d])/g;
// let NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;

// function isStrongEnough(password) {
//     let uc = password.match(UPPERCASE_RE);
//     let lc = password.match(LOWERCASE_RE);
//     let n = password.match(NUMBER_RE);
//     let nr = password.match(NON_REPEATING_CHAR_RE);
//     return password.length >= minLength &&
//     !nr &&
//     uc && uc.length >= uppercaseMinCount &&
//     lc && lc.length >= lowercaseMinCount &&
//     n && n.length >= numberMinCount;
// }

// function customPassword() {
//     let password = "";
//     let randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
//     while (!isStrongEnough(password)) {
//     password = generatePassword(randomLength, false, /[\w\d\?\-]/);
//     }
//     return password;
// }

// let generatedPassword = customPassword();
// console.log("GeneratedPassword: " + generatedPassword);
 
// // Encrypt
// var ciphertext = cryptoJs.AES.encrypt(generatedPassword, generatedPassword);
// console.log("Encrypt: " + ciphertext);

let myPassword = "1q8s7k0COp5Km";
let generatedPassword = "U2FsdGVkX1+5Tm3GO5HOH0K1qPXJxwV3Ol/H5g21i6k=";

// Decrypt
var bytes  = cryptoJs.AES.decrypt(generatedPassword, myPassword);
var decryptedData = bytes.toString(cryptoJs.enc.Utf8);
console.log("Decrypt: " + decryptedData);
