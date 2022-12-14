import React, { Component } from 'react'
import { uid } from '../../auth';
import axios from 'axios';
import Post from '../post/Post';
import "./profilePage.css"

export default class profilePage extends Component {
    state = { 
        posts:[],
        user:{},
        followingCount:0,
        followerCount:0,
        viewSelected: "posts",
        followers:[],
        following:[]
     }

     componentDidMount(){
        let posts;
        let user;
        let followingCount;
        let followerCount;
        let followers;
        let following;

        axios.get(`/api/post/${uid}`).then(obj =>{
            posts = obj.data.data;
            console.log(obj)
            return axios.get(`/api/user/${uid}`);
        }).then(obj =>{
            user = obj.data.data[0];
            return axios.get(`/api/request/getFollowers/${uid}`)
        }).then(obj =>{
            console.log(obj)
            followerCount = obj.data.requestName.length;
            followers=obj.data.requestName;
            return axios.get(`/api/request/getFollowing/${uid}`)
        })
        .then(obj =>{
            console.log(obj)
            followingCount = obj.data.requestName.length;
            following = obj.data.requestName;
            this.setState({
                posts,
                user,
                followingCount , 
                followerCount,
                followers,
                following
            })

        })
    }

    viewHandler = ( view ) => {
        if(this.state.viewSelected != view){
            this.setState({
                viewSelected : view
            })
        }
    }

  render() {
    return (
        <div className="profile">
            <div className="profile-top">
                <div className="profile-info">
                    <div className="profile-image">
                        <img src={this.state.user.pImage} alt=""/>
                    </div>
                    <div className="profile-name">{this.state.user.name}</div>
                    <div className="profile-username">{this.state.user.username}</div>
                    <div className="profile-bio">{this.state.user.bio}</div>
                </div>
                <div className="profile-stats">
                    <div className="profile-posts" onClick={ ()=> { this.viewHandler("posts") } }>
                        <div className="count">{this.state.posts.length}</div>
                        POSTS
                    </div>
                    <div className="profile-follower" onClick={ ()=> { this.viewHandler("follower") } }>
                        <div className="count">{this.state.followerCount}</div>
                        FOLLOWERS
                    </div>
                    <div className="profile-following" onClick={()=>{this.viewHandler("following")}}>
                        <div className="count">{this.state.followingCount}</div>
                        FOLLOWING
                    </div>
                </div>
            </div>
            {this.state.viewSelected == "posts" && <div className="profile-feeds">
                    {/* {this.state.posts.length && <h1>POSTS</h1> } */}
                    {console.log("hello")}
                    {this.state.posts.map(post =>{
                        return <Post key={post.pid} post={post} user={this.state.user}></Post>
                    })}
                </div> }
                {this.state.viewSelected == "follower" && <div className="profile-follower">
                    <h1>FOLLOWERS</h1>
                    {this.state.followers.map( follower =>{
                        return <div className="follower-item" key={follower.uid}> 
                        <div className="user-image">
                                <img src={follower.pImage} alt=""/>
                            </div>
                            <div className="user-info">
                                <div className="username">{follower.username}</div>
                                <div className="name">{follower.name}</div>
                            </div>
                        </div>
                    })}
                </div> }
                {this.state.viewSelected == "following" && <div className="profile-following">
                    <h1>FOLLOWING</h1>
                    {this.state.following.map( follow =>{
                        return <div className="follow-item" key={follow.uid}>
                            <div className="user-image">
                                <img src={follow.pImage} alt=""/>
                            </div>
                            <div className="user-info">
                                <div className="username">{follow.username}</div>
                                <div className="name">{follow.name}</div>
                            </div>
                        </div>
                    })}
                </div> }
        </div>
      );
  }
}