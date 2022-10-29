import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="instaLogo">
                    <img src="./images/instaicon.png" alt="" />
                </div>
                <div className="searchBar">
                    <div className="input-group rounded">
                        <input type="search" className  ="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span className="input-group-text border-0" id="search-addon">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="options">
                <Link to="/" style={{textDecoration:"none",color:"black"}}> <div className="homePage">home</div> </Link>
                   <Link to="/setting" style={{textDecoration:"none",color:"black"}}> <div className="setting">setting</div> </Link>
                   <Link to="/profile" style={{textDecoration:"none",color:"black"}}> <div className="likedPost">Profile</div> </Link>
                </div>
            </div>
        )
    }
}
