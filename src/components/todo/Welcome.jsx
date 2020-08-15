import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {
    render() {
        return (
            <div>
                <h1>Welcome {this.props.match.params.name}!</h1>
                <div className="container">
                    You can manage yout todos <Link to="/todos">here</Link>!
                </div>
            </div>
        )
    }
}

export default WelcomeComponent