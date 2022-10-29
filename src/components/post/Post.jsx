import React, { Component } from 'react'
import './post.css'
import axios from 'axios'

export default class Post extends Component {
    state = {
        username: "",
        userImage: "",
        postImage:"",
        likes: "",
        comments: ""
    }
    componentDidMount(){
        axios.get(`/api/user/${this.props.post.uid}`).then(obj =>{
            let user = obj.data.data[0];
            console.log(user);
            console.log(this.props.post.pImage)
            this.setState({
                username:user.username,
                userImage : user.pImage,
                postImage:this.props.post.pImage,
                caption : this.props.post.caption
            })
        })
    }
  render() {
      console.log(this.props);
    return (
      <div className='post'>
          <div className="post-navbar">
              <img src={this.state.userImage} alt="" />
              <div className="username">{this.state.username}</div>
          </div>
          <div className="post-img">
              <img src={this.state.postImage} alt="" />
          </div>
          <div className="post-action">
              <div className="like"><i className="far fa-heart"></i></div>
              <div className="comment"><i className="far fa-comment"></i></div>
          </div>
          <div className="post-likes-count">{this.state.likes}</div>
          <div className="post-comments">comments</div>
          <div className="post-add-comments">
                <input type="text" placeholder="Add a comment.."/>
                <button>Post</button>
          </div>
      </div>
    )
  }
}
