const connection = require('../model/db');
const { v4: uuidv4 } = require('uuid');

async function allUserDetail(req,res){
        let sql=`Select * from user_table`;
        connection.query(sql,function(error,data){
            if(error){
                res.json({
                    message:"unable to all details",
                    error
                })
            } else{
                res.status(200).json({
                    message:"all user details !!",
                    data
                })
            }
        }) 
    
}
function createUserPromisified(userObject){
    return new Promise(function(resolve,reject){
        let {uid,name,email, bio, username,isPublic,pw } = userObject;
        let sql;
        if(isPublic != undefined){
            sql = `INSERT INTO user_table(pid , name , email , pw , username , bio , pImage, isPublic) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${username}' , '${bio}' ,'${pImage ? pImage : "default.png"}', ${isPublic})`
        }
        else{
            sql = `INSERT INTO user_table(pid , name , email , pw , username , pImage, bio ) VALUES ( '${uid}' , '${name}' , '${email}' , '${pw}' , '${username}' ,'${pImage ? pImage : "default.png"}', '${bio}')`
        }
        console.log(sql);
        connection.query(sql , function(error , data){
           if(error){
               reject(error);
           }
           else{
               resolve(data);
           }
    })
})
}

async function createUser(req,res){
    try {
        let uid=uuidv4();
        // console.log(res.body)
        let pimage = req.file.destination + "/" + req.file.filename;
        // public/images/user/akjsbfasbhf.jpeg
        pimage = pimage.substring(42);
        const {name,email, bio, username,isPublic,pw } = req.body;
        let userObject = {
            uid,
            name,
            email,
            pw,
            username,
            bio,
            pimage,
            isPublic
        }
        let data = await createUserPromisified(userObject);
        // console.log(data);
        res.status(200).json({
            message:"User created!!",
            data
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:"failed to create",
            error
        })
    }
}

async function deleteUserById(req,res){
    const uid = req.params.uid;
    const sql = `delete from user_table where pid='${uid}'`
    connection.query(sql,function(error,data){
        if(error){
            res.json({
                message:"unable to delete user details", 
                error
            })
        } else{
            if(data.affectedRows){
                res.status(200).json({
                    message:"deleted user details !!",
                    data
                })

            }else{
                res.json({
                    message:"no user found"
                })
            }
        }
    })
}

function updateUserById(req,res){
    const obj=req.body;
    const uid = req.params.uid;
    console.log(obj);
    let sql= `update user_table set `
    for(key in obj){
        sql+=`${key}`+`=`+`'${obj[key]}'`+` ,`;
    }
    if(req.file){
        let pimage = req.file.destination + "/" + req.file.filename;
        // public/images/user/akjsbfasbhf.jpeg
        pimage = pimage.substring(42);
        sql += ` pimage = '${pimage}' ` 
      }
    sql=sql.substring(0,sql.length-1);
    sql+=`where pid='${uid}'`
    console.log(sql)
    connection.query(sql,function(error,data){
        if(error){
            res.json({
                message:"unable to update user details", 
                error
            })
        } else{
            if(data.affectedRows){
                res.status(200).json({
                    message:"updated user details !!",
                    data
                })

            }else{
                res.json({
                    message:"no changes occured"
                })
            }
        }
    })
}

function getUserPromisified(uid){
    return new Promise(function(resolve,reject){
        // console.log(uid)
        const sql = `select * from user_table where pid='${uid}'`;
        connection.query(sql , function(error , data){
           if(error){
               reject(error);
           }
           else{
               resolve(data);
           }
    })
})
}

async function getUserById(req,res){
    try {
        const uid = req.params.uid;
        let data = await getUserPromisified(uid);
        if(data.length){
            res.status(200).json({
                message:"successfuly user obj sent",
                data
            })
        }else{
            res.json({
                message:"no user found "
            })
        }
    } catch (error) {
        res.json({
            message:"failed to send user obj",
            error
        })
    }
}

module.exports.createUser = createUser;
module.exports.allUserDetail = allUserDetail;
module.exports.deleteUserById = deleteUserById;
module.exports.updateUserById = updateUserById;
module.exports.getUserById = getUserById;
module.exports.getUserPromisified = getUserPromisified;