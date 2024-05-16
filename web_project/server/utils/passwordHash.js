// // const bcrypt = require("bcrypt");
// const saltRounds = 10;
// let hashedPassword;

// const passwordHash = (incomingPassword) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.genSalt(saltRounds, (err, salt) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       bcrypt.hash(incomingPassword, salt, (err, hash) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         resolve(hash)
//       });
//     });
//   });
//   // return hashedPassword;
// };

// module.exports = passwordHash;
