const connection = require('../model/db');
const { getUserPromisified, getUserById } = require('./userController');

function createFollowingPromisified(userObject,isPublic){
    return new Promise(function(resolve,reject){
        let {pid,followerId} = userObject;
        let sql;
        if(isPublic != false){
            sql = `insert into following_table (pid,followingId) values('${pid}','${followerId}')`;
        }
        else{
            sql = `insert into following_table (pid,followingId,isAccepted) values('${pid}','${followerId}','${isPublic}')`;
        }
        // console.log(sql);
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

function createFollowersPromisified(followerId,pid){
    return new Promise(function(resolve,reject){
        // let {pid,followerId} = userObject;
        // console.log(pid,followerId)
            let sql = `insert into followers_table (pid,followerId) values('${pid}','${followerId}')`;
        // console.log(sql);
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

function acceptRequestPromisified(pid,followerId){
    return new Promise(function(resolve,reject){
            let sql = `update following_table set isAccepted = '1' where pid='${pid}'and followingId='${followerId}'`;
        // console.log(sql);
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

function getPendingRequestPromisified(pid){
    return new Promise(function(resolve,reject){
            let sql = `select followingId from following_table where pid='${pid}'and isAccepted='0'`;
        // console.log(sql);
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

function cancelRequestPromisified(followId , uid ){
    return new Promise(function(resolve , reject){
        let sql = `DELETE FROM following_table WHERE pid = '${uid}' AND followingId = '${followId}'`;
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

function getFollowersPromisified(pid){
    return new Promise(function(resolve,reject){
        let sql = `select followerId from followers_table where pid = '${pid}'`
        connection.query(sql,function(error,data){
            if(error){
                reject(error);
            }
            else{
                // console.log(data)
                resolve(data);
            }
        })
    })
}

function getFollowingsPromisified(pid){
    return new Promise(function(resolve,reject){
        let sql = `select followingId from following_table where pid = '${pid}' and isAccepted = '1'`
        connection.query(sql,function(error,data){
            if(error){
                reject(error);
            }
            else{
                // console.log(data)
                resolve(data);
            }
        })
    })
}

function deleteFollowerPromisified(followId , uid ){
    return new Promise(function(resolve , reject){
        let sql = `DELETE FROM followers_table WHERE pid = '${uid}' AND followerId = '${followId}'`;
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

function deleteFollowingPromisified(uid , followId ){
    return new Promise(function(resolve , reject){
        let sql = `DELETE FROM following_table WHERE pid = '${uid}' AND followingId = '${followId}'`;
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

async function sendRequest(req,res){
    try{
        let {pid,followerId} = req.body;
        console.log(pid,followerId);
        let followerObj = await getUserPromisified(followerId);
        let data,data_;
        if(followerObj[0].isPublic){
            // console.log("in")
             data = await createFollowingPromisified(req.body,true);
             data_ = await createFollowersPromisified(pid,followerId);
    
        }else{
            // console.log("out")
             data = await createFollowingPromisified(req.body,false);
        }
        res.status(200).json({
            message:"follow request send",
            data,
            data_
        })
    }
    catch(error){
        res.json({
            message:"failed to send request",
            error
        })
    }
    
}

async function pendingRequest(req,res){
    try {
        let pid = req.params.uid;
       
        let data=await getPendingRequestPromisified(pid);
        let requestName=[];
        
        for(let i=0;i<data.length;i++){
            let user = await getUserPromisified(data[i].followingId);
            console.log(user);
            requestName.push(user);
        }

        res.status(200).json({
            message:"pending request succes",
            requestName
        })
    } catch (error) {
        res.json({
            message:"pending request failed",
            error
        })
    }
}

async function acceptRequest(req,res){
    try {
        let {pid,followerId} = req.body;
        let data = await acceptRequestPromisified(pid,followerId);
        let data_=await createFollowersPromisified(pid,followerId);
        // console.log(data_)

        res.status(200).json({
            message:"follow request accepted",
            data,
            data_
        })
    } catch (error) {
        res.json({
            message:"failed to accept request",
            error
        })
    }
}

async function cancelRequest(req , res){
    try{
        let {uid , toBeCancelId} = req.body;
        let cancelObj = await cancelRequestPromisified(uid , toBeCancelId);
        res.json({
            message:"Cancelled Request !",
            cancelObj
        })
    }
    catch(error){
        res.json({
            message:"Failed to cancel Request",
            error
        })
    }
}

async function getFollowers(req , res){
    try{
        let pid = req.params.uid;
        let data = await getFollowersPromisified(pid);
        // console.log("pid");
        let requestName=[];
        
        for(let i=0;i<data.length;i++){
            let user = await getUserPromisified(data[i].followerId);
            // console.log(user);
            requestName.push(user);
        }
        res.status(200).json({
            message:"followers list is succesful",
            requestName
        })
    }
    catch(error){
        res.json({
            message:"Failed to get followers",
            error
        })
    }
}


async function getFollowings(req , res){
    try{
        let pid = req.params.uid;
        let data = await getFollowingsPromisified(pid);
        // console.log(data);
        let requestName=[];
        
        for(let i=0;i<data.length;i++){
            let user = await getUserPromisified(data[i].followingId);
            console.log(user[0]);
            requestName.push(user[0]);
        }
        res.status(200).json({
            message:"following list is succesful",
            requestName
        })
    }
    catch(error){
        res.json({
            message:"Failed to get followings",
            error
        })
    }
}

async function unfollow(req,res){
    try{
        let {pid , followId} = req.body;
        let data = await deleteFollowerPromisified(pid,followId);
        let data_ = await deleteFollowingPromisified(pid,followId);
        // console.log(data);
       
        res.status(200).json({
            message:"unfollow is succesful",
            data,
            data_
        })
    }
    catch(error){
        res.json({
            message:"Failed to unfollow",
            error
        })
    }
}

module.exports.sendRequest = sendRequest;
module.exports.pendingRequest = pendingRequest;
module.exports.acceptRequest = acceptRequest;
module.exports.cancelRequest = cancelRequest;
module.exports.getFollowers = getFollowers;
module.exports.getFollowings = getFollowings;
module.exports.unfollow = unfollow;