const express = require("express");
const app = express();
const executeQuery = require("../connection");
const bodyParser = require("body-parser");
// const passwordHash = require("../utils/passwordHash");
// const jwt = require("jsonwebtoken");s
const generateRandomString = require("../utils/generateRandomString");
const secretKey = "hagsydgsdjkasdkbh7yiuJHBJGCD";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = {
      loginRequest: async (req, res, next) => {
            const { nrp, password } = req.body;
            try {
                  const sql = `SELECT * FROM siswa WHERE nrp = '${nrp}';`;
                  const data = await executeQuery(sql);

                  if (data.length > 0) {
                        if (data[0].is_first_auth == 1) {
                              if (nrp === data[0].nrp && password === data[0].password) {
                                    const token = generateRandomString(10)
                                    res.status(200).json({ token: token, user: data[0] });
                                    next();
                              } else {
                                    res.status(400).send("NRP atau password salah!");
                              }
                        } else {
                              if (
                                    nrp === data[0].nrp &&
                                    password === data[0].password
                              ) {
                                    const token = generateRandomString(10);
                                    res.status(200).json({ token: token, user: data[0] });
                                    next();
                              } else {
                                    res.status(400).send("NRP atau password salah!");
                              }
                        }
                  } else {
                        res.status(400).send(`User tidak terdaftar.`);
                  }
            } catch (error) {
                  res.status(500).json({ message: error.message });
            }
      },
      verifyAuthorizedUser: (req, res, next) => {
            // try {
            //       const refreshToken = req.cookie.refresh_token;
            //       if (!refreshToken) {
            //             res.status(401).send("Silahkan login terlebih dahulu!");
            //       }
            //       const decode = jwt.verify(refreshToken, secretKey);
            //       if (!decode) {
            //             res.status(401).json({ message: "Unauthorized: Invalid token!" });
            //       }
            //       res.status(200).json({ authorized: true });
            // } catch (error) {
            //       res.status(500).send("Internal server error!");
            // }
      },
      logoutRequest: async (req, res) => {
            res.json({ message: "Berhasil logout!" });
      },
      updatePasswordForNewAuth: async (req, res) => {
            const { nrp, password } = req.body;
            try {
                  const dataMahasiswa = `SELECT * FROM siswa WHERE nrp='${nrp}';`;
                  let response = await executeQuery(dataMahasiswa);

                  if (response.length > 0) {
                        // hashedPassword = await passwordHash(password);
                        const updatePassword = `UPDATE siswa SET password='${password}', is_first_auth=${0} WHERE nrp='${nrp}' AND is_first_auth=${1};`;
                        let resetResponse = await executeQuery(updatePassword);
                        if (resetResponse.affectedRows > 0) {
                              console.log(resetResponse)
                              res.status(200).json({
                                    message: `Berhasil reset password user dengan NRP ${nrp}`,
                              });
                        } else {
                              res.status(403).json({ message: "Reset password hanya bisa 1 kali!" });
                        }
                  } else {
                        res.status(400).send(`User tidak terdaftar.`);
                  }
            } catch (error) {
                  res.status(500).send(`${error}`);
            }
      },
};
