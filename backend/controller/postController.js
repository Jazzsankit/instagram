const connection = require('../model/db');
const { v4: uuidv4 } = require('uuid');

async function allPostDetails(req,res){
        let sql=`Select * from post_table`;
        connection.query(sql,function(error,data){
            if(error){
                res.json({
                    message:"unable to get all details",
                    error
                })
            } else{
                res.status(200).json({
                    message:"all post details !!",
                    data
                })
            }
        }) 
    
}
function createPostPromisified(postObject){
    return new Promise(function(resolve,reject){
        let {uid,pid,postImage,caption} = postObject;
        let createdOn = new Date();
        createdOn = createdOn.toString();
        createdOn = createdOn.substring(4 ,24);
        console.log(createdOn)
        let  sql = `INSERT INTO post_table(uid, pid, pImage, caption, createdOn) VALUES ( '${uid}' , '${pid}' , '${postImage}' , '${caption}' , '${createdOn}')`;
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

async function createPost(req,res){
    try {
        let pid=uuidv4();
        console.log(req.file)
        let postImage = req.file.destination + "/" + req.file.filename;
        postImage = postImage.substring(41);
        postImage = "." + postImage;
        // console.log(postImage);
        const {uid, caption} = req.body;
        let postObject = {
            pid,
            uid,
            caption,
            postImage
        }
        let data = await createPostPromisified(postObject);
        // console.log(data);
        res.status(200).json({
            message:"Post created!!",
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

async function deletePostById(req,res){
    const uid = req.params.uid;
    const sql = `delete from post_table where pid='${uid}'`
    connection.query(sql,function(error,data){
        if(error){
            res.json({
                message:"unable to delete post details", 
                error
            })
        } else{
            if(data.affectedRows){
                res.status(200).json({
                    message:"deleted post details !!",
                    data
                })

            }else{
                res.json({
                    message:"no post found"
                })
            }
        }
    })
}

async function upatePostById(req,res){
    // const pid=req.params.pid
    const {caption,uid} = req.body;
    console.log(req.body)
    // let sql = `UPDATE post_table SET caption = '${caption}' WHERE pid = '${pid}'`;
    // console.log(sql);
    // connection.query(sql,function(error,data){
    //     if(error){
    //         res.json({
    //             message:"unable to update user details", 
    //             error
    //         })
    //     } else{
    //         if(data.affectedRows){
    //             res.status(200).json({
    //                 message:"updated user details !!",
    //                 data
    //             })

    //         }else{
    //             res.json({
    //                 message:"no changes occured"
    //             })
    //         }
    //     }
    // })
}

async function getPostById(req,res){
    const uid = req.params.pid;
    const sql = `select * from post_table where uid='${uid}'`
    connection.query(sql,function(error,data){
        if(error){
            res.json({
                message:"unable to user details", 
                error
            })
        } else{
            res.status(200).json({
                message:"got user details !!",
                data
            })
        }
    })
}

module.exports.createPost = createPost;
module.exports.allPostDetails = allPostDetails;
module.exports.deletePostById = deletePostById;
module.exports.upatePostById = upatePostById;
module.exports.getPostById = getPostById;