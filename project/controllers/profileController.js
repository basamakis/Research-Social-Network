'use strict';
const path = require('path');

exports.showProf = (req, res, pool) => {

    const token = req.user;
    let checkPosts;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(`select * from ADDITION where adUserID= ${token.id}`, (err, result) => {
            if (!result[0]) {
                checkPosts = true;
            }
            else {
                checkPosts = false;
            }
            if (checkPosts === true) {
                connection.query(`select * from USER join LOGIN on userID = logUserID where userID= ${token.id}`, (err, rows) => {
                    //release the connection once done
                    connection.release();
                    if (!err) {
                        res.render('userProfNoPosts', { layout: 'layout.hbs', rows, logged: true });
                    }
                });
            }
            else {

                connection.query(`select * from USER join LOGIN on userID = logUserID where userID= ${token.id}`, (err, rows) => {
                    //release the connection once done
                    if (!err) {
                        connection.query(`select * from addition 
                        join document on adDocumentID = documentID
                        join user on adUserID = userID
                        where adUserID = ${token.id}`, (err, result) => {
                            if (!err) {
                                result = result.reverse();
                                res.render('userProf', { layout: 'layout.hbs', rows, result, logged: true });
                            } else {
                                console.log(err)
                            }
                        });
                    }
                });

            }
        })
    });
}

exports.updateProfPic = (req, res, pool) => {
    let sampleFile;
    let uploadPath;
    const token = req.user;
    // CHECK IF YOU ARE GETTING THE FILE
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded.')
    }

    //get the file and uploadPath
    sampleFile = req.files.sampleFile;
    uploadPath = require('path').resolve(__dirname, '..') + '/public/UserProfile/uploads/' + sampleFile.name;

    //use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);


        pool.getConnection((err, connection) => {
            if (err) throw err;

            connection.query(`update USER SET profPic= ? WHERE userID = ${token.id}`, [sampleFile.name], (err, rows) => {
                //release the connection once done
                connection.release();
                if (!err) {
                    res.redirect('/login/userProf');
                }
            });
        });
    })
}

exports.updateName = (req, res, pool) => {

    let firstName = req.body.fname
    let lastName = req.body.lname
    const token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET fname= ? WHERE userID = ${token.id}`, [firstName], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                console.log('continue to last name');
            }
        });
    });
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET lname= ? WHERE userID = ${token.id}`, [lastName], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.redirect('/login/userProf');
            }
        });
    });
}

exports.updateBio = (req, res, pool) => {

    let bio = req.body.bio
    const token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET biography= ? WHERE userID = ${token.id}`, [bio], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.redirect('/login/userProf');
            } else {
                console.log('why u do dis?')
            }
        });
    });
}


exports.updateCommunicationPoints = (req, res, pool) => {

    let address = req.body.address
    let city = req.body.city
    let country = req.body.country
    let phone = req.body.phone
    let email = req.body.email
    console.log(address, city, country, phone, email)
    const token = req.user;
    console.log(token)
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET address= ? WHERE userID = ${token.id}`, [address], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                console.log('continue with queries ')
            } else {
                console.log('why u do dis?')
            }
        });
    });



    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET city= ? WHERE userID = ${token.id}`, [city], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                console.log('continue with queries ')
            } else {
                console.log('why u do dis?')
            }
        });
    });



    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET country= ? WHERE userID = ${token.id}`, [country], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                console.log('continue with queries ')
            } else {
                console.log('why u do dis?')
            }
        });
    });


    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET phone= ? WHERE userID = ${token.id}`, [phone], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                console.log('continue with queries ')
            } else {
                console.log('why u do dis?')
                console.log(err)
            }
        });
    });



    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update LOGIN SET email= ? WHERE loginID = ${token.id}`, [email], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.redirect('/login/userProf');
            } else {
                console.log('why u do dis?')
            }
        });
    });
}


exports.updateEducation = (req, res, pool) => {

    let education = req.body.education
    const token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET education= ? WHERE userID = ${token.id}`, [education], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.redirect('/login/userProf');
            } else {
                console.log('why u do dis?')
            }
        });
    });
}


exports.updateWork = (req, res, pool) => {

    let work = req.body.work
    const token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(`update USER SET work= ? WHERE userID = ${token.id}`, [work], (err, rows) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.redirect('/login/userProf');
            } else {
                console.log('why u do dis?')
            }
        });
    });
}


exports.uploadDoc = (req, res, pool) => {
    let sampleFile;
    let uploadPath;

    let name = req.body.name;
    let category = req.body.category;
    category = category.charAt(0).toUpperCase() + category.slice(1)
    let abstract = req.body.abstract;
    let authors = req.body.authors;

    let wordsArray = authors.toLowerCase().split(' ')
    let capsArray = []
    wordsArray.forEach(word => {
        capsArray.push(word[0].toUpperCase() + word.slice(1))
    });
    authors = capsArray.join(' ');
    let type = req.body.type;
    let date = req.body.publishedDate;
    let today = new Date().toISOString().slice(0, 10);
    const token = req.user;

    // CHECK IF YOU ARE GETTING THE FILE
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('no files were uploaded.')
    }

    //get the file and uploadPath
    sampleFile = req.files.sampleFile;
    uploadPath = require('path').resolve(__dirname, '..') + '/public/UserProfile/uploads/' + sampleFile.name;

    //use mv() to place file on the server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        pool.getConnection((err, connection) => {
            if (err) throw err;
            connection.query(`INSERT INTO DOCUMENT SET  ? `, { abstract: abstract, name: name, file: sampleFile.name, type: type, date: date, authNames: authors }, (err, result) => {
                //release the connection once done
                if (!err) {
                    let documentId = result.insertId
                    connection.query(`INSERT INTO ADDITION SET  ? `, { date: today, adUserID: token.id, adDocumentID: documentId }, (err, result) => {
                        if (!err) {
                            console.log('continue')
                        } else {
                            console.log(err)
                        }
                    });
                    connection.query(`UPDATE CATEGORY SET total_documents = total_documents + 1 WHERE topic = '${category}'`, (err, result) => {
                        if (!err) {
                            console.log('continue')
                        } else {
                            console.log(err)
                        }
                    });

                    connection.query(`select * from CATEGORY  WHERE topic = '${category}'`, (err, result) => {
                        if (!err) {
                            connection.query(`INSERT INTO   BELONG SET  ? `, { bCategoryID: result[0].categoryID, bDocumentID: documentId }, (err, result) => {
                                if (!err) {
                                    res.redirect('/login/userProf');
                                } else {
                                    console.log(err)
                                }
                            });
                        } else {
                            console.log(err)
                        }
                    });

                }
                else {
                    console.log(err)
                }
            });
        });
    })
}

exports.downloadDoc = (req, res, pool) => {
    let documentId = req.url.substring(req.url.lastIndexOf('/') + 1)
    pool.getConnection((err, connection) => {
        if (err) throw err;//Check if connection is done properly
        connection.query(`select * from document where documentID =  ${documentId}`, (err, result) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.download(`./public/UserProfile/uploads/${result[0].file}`, result[0].file, (err) => { });
            } else {
                console.log(err)
            }
        });
    });
}

exports.editDoc = (req, res, pool) => {
    let sampleFile;
    let uploadPath;

    let name = req.body.name;
    let category = req.body.category;
    category = category.charAt(0).toUpperCase() + category.slice(1)
    let abstract = req.body.abstract;
    let authors = req.body.authors;
    authors = authors.replace(/,(?=[^\s])/g, ", ");
    let date = req.body.publishedDate;
    let documentId = req.url.substring(req.url.lastIndexOf('/') + 1)
    let token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;
        if (!sampleFile) {
            connection.query(`UPDATE  DOCUMENT SET abstract=? , name=?, date=?, authNames=? where documentID = ${documentId}`, [abstract, name, date,authors], (err, result) => {
                //release the connection once done
                if (!err) {
                    console.log('continue');
                } else {
                    console.log(err)
                }
            });
        }
        else {
            connection.query(`UPDATE  DOCUMENT SET abstract=? , name=?, file=? , date=?, authNames=? where documentID = ${documentId}`, [abstract, name, sampleFile.name, date,authors], (err, result) => {
                //release the connection once done
                if (!err) {
                    console.log('continue');
                } else {
                    console.log(err)
                }
            });
        }
        connection.query(`SELECT  * FROM BELONG WHERE  bDocumentID = ${documentId}`, (err, result) => {
            console.log(result)
            if (err) console.log(err);
            connection.query(`UPDATE  CATEGORY SET total_documents = total_documents - 1 where categoryID = ${result[0].bCategoryID}`, (err, rows) => {

                connection.query(`SELECT  * FROM CATEGORY WHERE topic = '${category}'`, (err, result) => {
                    console.log(result)
                    if (err) console.log(err);
                    connection.query(`UPDATE  BELONG SET bCategoryID =?, bDocumentID=?`, [result[0].categoryID, documentId], (err, rows) => {
                        connection.query(`SELECT  * FROM BELONG WHERE  bDocumentID = ${documentId}`, (err, result) => {
                            console.log(result)
                            if (err) console.log(err);
                            connection.query(`UPDATE  CATEGORY SET total_documents = total_documents + 1 where categoryID = ${result[0].bCategoryID}`, (err, rows) => {
                                connection.release();
                                res.redirect('/login/userProf');
                            });
                        })
                    });

                })
            });
        })
    });
}


exports.deleteDoc = (req, res, pool) => {
    let documentId = req.url.substring(req.url.lastIndexOf('/') + 1)
    pool.getConnection((err, connection) => {
        if (err) throw err;//Check if connection is done properly
        connection.query(`DELETE  from DOCUMENT where documentID =  ${documentId}`, (err, result) => {
            //release the connection once done
            connection.release();
            if (!err) {
                res.redirect('/login/userProf');
            } else {
                console.log(err)
            }
        });
    });
}


exports.displayDoc = (req, res, pool) => {
    let documentId = req.url.substring(req.url.lastIndexOf('/') + 1)
    pool.getConnection((err, connection) => {
        if (err) throw err;//Check if connection is done properly
        connection.query(`SELECT * FROM BELONG 
        JOIN DOCUMENT ON bDocumentID=documentID
        JOIN CATEGORY ON bCategoryID=categoryID  where documentID =  ${documentId}`, (err, result) => {
            // let reqPath = path.join(__dirname,'../')
            // reqPath = reqPath + 'public/UserProfile/uploads'
        
            // reqPath = reqPath + `/${docFile}`
            //release the connection once done
            connection.release();
            let authors = result[0].authNames.split(',');
            if (!err) {
                res.render('displayPaper', { layout: 'layout.hbs', result, logged:true , authors })
            } else {
                console.log(err)
            }
        });
    });
}


exports.saveDoc = (req, res, pool) => {
    const documentId = req.url.substring(req.url.lastIndexOf('/') + 1)
    const token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;//Check if connection is done properly
        connection.query(`INSERT INTO SAVES VALUES (${token.id}, ${parseInt(documentId)})`, (err, result) => {

            connection.release();
            if (!err) {
                res.send('Document saved successfully')

            } else {
                console.log('Already saved document')
                res.send('Already saved document')
            }
        });
    });
}

exports.displaySavedDoc = (req, res, pool)=>{
    let token = req.user;
    pool.getConnection((err, connection) => {
        if (err) throw err;//Check if connection is done properly
        connection.query(`SELECT * FROM BELONG 
        JOIN DOCUMENT ON bDocumentID=documentID
        JOIN CATEGORY ON bCategoryID=categoryID
        JOIN SAVES ON bDocumentID = sDocumentID  
        and sUserID =${token.id}`, (err, result) => {
            console.log(result)
            connection.release();
            let authors;
            result.forEach((element1) => {
                element1.authArr = new Array();
                authors = element1.authNames.split(',');
                console.log(element1.authNames);
                authors.forEach((element2) => {
                    element1.authArr.push(element2)
                })
            })
            if (!err) {
                res.render('savedPaper', { layout: 'layout.hbs', logged:true ,result,authors })
            } else {
                console.log(err)
            }
        });
    });
}