import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.match.params.name}!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}
                    You can manage yout todos <Link to="/todos">here</Link>!
                </div>
                <div className="container">
                    Click here to get a customizes welcome message. <br></br>
                   <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage(){
        console.log("msg test")
    }
}

export default WelcomeComponent