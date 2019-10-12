import React, {Component} from 'react';

export class Header extends Component {
    render() {
        if(this.props.isSignedIn) {
            return (
                <div style={{marginBottom: "50px"}}>
                    <img src="logo192.png" alt="Internship Tracker Logo" style={{display: "inline-block", height: "50px", marginLeft: "10%", marginRight: "5%"}}></img>
                    <h1 style={{display: "inline-block", marginLeft: "5%", marginRight: "5%"}}>Internship Tracker</h1>
                    <div style={{display: "inline-block", marginLeft: "5%", marginRight: "10%"}}>Signed in!</div>
                </div>
            );
        } else {
            return (
                <div style={{marginBottom: "50px"}}>
                    <img src="logo192.png" alt="Internship Tracker Logo" style={{display: "inline-block", height: "50px", marginLeft: "10%", marginRight: "5%"}}></img>
                    <h1 style={{display: "inline-block", marginLeft: "5%", marginRight: "5%"}}>Internship Tracker</h1>
                    <button onClick={this.props.signIn} style={{display: "inline-block", marginRight: "10%", marginLeft: "5%"}}>Sign in</button>                </div>
            );
        }
    }
}

export default Header;