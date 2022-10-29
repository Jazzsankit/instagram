import React, { Component } from 'react'
import './profile.css'
import axios from 'axios'
export default class Profile extends Component {
    state = { 
        user : {username:"" , name:"" , pImage : ""} ,
        suggestions : [ {suggestionImage : "./images/pexels-photo.webp" , suggestionName:"Tony Stark"} ,{suggestionImage : "./images/back.jpg" , suggestionName:"Steve Rogers"}   ]
     }


     componentDidMount(){   
        let user;
        axios.get("/api/user/20c7d980-591b-4e5c-b107-8e0abbf81b07").then( obj =>{
             console.log(obj);
             user = obj.data.data[0];
         })
         .then( obj =>{
            //  let suggestions = obj.data.suggestions;
             this.setState({
                 user 
                //  suggestions
             })
         })
     }
    render() {
        return (
            <div className="profile-view">
                <div className="user">
                    <div className="user-image">
                        <img src={this.state.user.pImage} alt="" />
                    </div>
                    <div className="user-detail">
                        <div className="username">{this.state.user.username}</div>
                        <div className="fullname">{this.state.user.fullname}</div>
                    </div>
                </div>
                <div className="suggestions">
                    Suggestion
                    {this.state.suggestions.map( suggestion =>{
                        return (<div className="suggestion-user">
                        <div className="suggestion-user-image">
                            <img src={suggestion.suggestionImage} alt=""/>
                        </div>
                        <div className="suggestion-user-name">{suggestion.suggestionName}</div>
                        <button className="suggestion-user-follow">Follow</button>
                    </div>)
                    })}
                </div>
            </div>
        )
    }
}
