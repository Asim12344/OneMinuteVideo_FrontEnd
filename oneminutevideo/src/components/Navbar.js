import React ,{Fragment} from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

const navbar = (props) => {
    return (
        <nav>
            <label className="logo">One Minute Video</label>
            <ul>
                <Fragment> 
                    <li><NavLink exact to='/home'>HOME</NavLink></li>
                    <li><NavLink exact to='/dashboard'>SIGN UP</NavLink></li>
                    <li><NavLink exact to='/dashboard'>LOG IN</NavLink></li>
                    <li><NavLink exact to='/dashboard'>MY MEMBERSHIP</NavLink></li>
                    <li><NavLink exact to='/dashboard'>CONTACT US</NavLink></li>
                </Fragment>
                
            </ul>
        </nav>
    )
}



export default (withRouter(navbar))