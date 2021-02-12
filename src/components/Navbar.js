import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ logout, idxId }){
	return(
		<nav className="navbar navbar-expand-sm bg-primary-color bg-light">
            <Link className="navbar-brand" to="/">
                <img className="logo" src="images/logo.png" alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Partners</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Contact</a>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    {!idxId ? (
                        <li className="nav-item">
                            <Link className="nav-link btn btn-outline-warning" to="/login">Get Started</Link>
                        </li>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link btn btn-outline-warning" to="/login" onClick={logout}>Log Out</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
	)
}

export default Navbar;