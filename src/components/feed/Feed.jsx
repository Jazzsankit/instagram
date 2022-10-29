import React, { Component } from 'react'
import Post from '../post/Post'
import './feed.css'
import axios from 'axios'
import { uid } from '../../auth'

export default class Feed extends Component {
  // {
  //   id: 1, username: "Ankit kr",
  //   userImg: "./images/back.jpg",
  //   postImg: "./images/pexels-photo.webp",
  //   likes: "54654",
  //   comments: "hey boi"
  // },
  // {
  //   id: 2, username: "Ayush kr",
  //   userImg: "./images/pexels-photo.webp",
  //   postImg: "./images/back.jpg",
  //   likes: "9989 likes",
  //   comments: "hey boi"
  // },
  // {
  //   id: 3,
  //   username: "Ashu kr",
  //   userImg: "./images/back.jpg",
  //   postImg: "./images/pexels-photo.webp",
  //   likes: "7979 likes",
  //   comments: "hey boi"
  // }
  state = {
    posts: [],
    caption:""
  }
  fileInput = React.createRef();

  componentDidMount(){
    axios.get("/api/post").then(obj =>{
      console.log(obj);
      let posts = obj.data.data;
      posts.sort((a,b)=>{
        return new Date(b.createdOn) - new Date(a.createdOn);
      })

      this.setState({
        posts:posts,
        caption:""
      })
    })
  }

  onChangeHandler = (e) =>{
    this.setState({
      caption:e.target.value
    })
  }

  onUploadHandler = () =>{
    console.log("on uploadhandler")
    if(this.fileInput.current.files){
      let file = this.fileInput.current.files[0];
      let formData = new FormData();
      formData.append('post' , file);
      formData.append('caption' , this.state.caption);
      formData.append('uid' , uid);
      axios.post("/api/post" , formData).then(obj =>{
        this.componentDidMount();
      })
    }
  }

  render() {
    return (
      <div className="feeds">
        <div className="upload-post">
          <input type="file" name="" id="" ref={this.fileInput}/>
          <input type="text" value={this.state.caption} onChange={(e) => {this.onChangeHandler(e)}}/>
          <button onClick={this.onUploadHandler}>Upload Post</button>
      </div>
        {this.state.posts.map(post => {
          return <Post key={post.id} post={post} />
        })}
      </div>
    )
  }
}
