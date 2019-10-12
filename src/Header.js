import React, {Component} from 'react';

export class Header extends Component {
    render() {
        if(this.props.isSignedIn) {
            return (
                <div>
                    <img src="logo192.png" alt="Internship Tracker Logo" style={{float: "left", height: "50px", marginLeft: "50px", marginTop: "50px"}}></img>
                    <div style={{float: "right"}}>Signed in!</div>
                    <h1>Internship Tracker</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <img src="logo192.png" alt="Internship Tracker Logo" style={{float: "left", height: "50px", marginLeft: "50px", marginTop: "50px"}}></img>
                    <button onClick={this.props.signIn} style={{float: "right", marginRight: "50px", marginTop: "50px"}}>Sign in</button>
                    <h1>Internship Tracker</h1>
                </div>
            );
        }
    }
}

export default Header;