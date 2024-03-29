import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.state = {
            welcomeMessage: '',
            errorMessage: ''
        }
        this.handleSuccesfulResponse = this.handleSuccesfulResponse.bind(this);
        this.handleErrorResponse = this.handleErrorResponse.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.match.params.name}!</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}.
                    You can manage your TODOS <Link to="/todos">here</Link>!
                </div>
                <div className="container">
                    Click here to get a customized welcome message. <br></br>
                   <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.welcomeMessage}
                </div>
                <div className="alert-danger">
                    {this.state.errorMessage}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage(){
        HelloWorldService.executeHelloWorldPathService(this.props.match.params.name)
            .then(response => this.handleSuccesfulResponse(response))
            .catch(error => this.handleErrorResponse(error));
    }

    handleSuccesfulResponse(response) {
        console.log(response)
        this.setState({
            welcomeMessage: response.data.message
        })
    }

    handleErrorResponse(error) {
        console.log(error.response)

        let errorMessage = '';
        if(error.message){
            errorMessage += error.message 
        }
        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }

        this.setState({errorMessage: errorMessage})
    }
}

export default WelcomeComponent