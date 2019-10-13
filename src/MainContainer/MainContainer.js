import React, {Component} from 'react';
import EmailList from './Email/EmailList';
export class MainContainer extends Component {
    render() {
        return (
            <EmailList years={this.props.years}/>
        );
    }
}

export default MainContainer;