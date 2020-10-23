import React, {Component} from 'react';
import { Redirect, Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button, FormFeedback } from 'reactstrap';
import Dashboard from './DashboardComponent';


const required = (val) => val && val.length;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            submitted : false,
            email: '',
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(event)
    {
        event.preventDefault();
        required(this.email.value);
        required(this.password.value);
        validEmail(this.email.value);
        if(this.password.value == "admin@123")
        {
            this.setState({email: this.email.value});
            this.setState({submitted: true});
        }
            
        else
            alert("invalid credentials");
    }

    render()
    {
       
        if(this.state.submitted == true)
        {
            return  <Dashboard  email={this.state.email} />   
        }  
        return(
            <React.Fragment>
                <div className="container mt-5 pt-5 pb-5 mb-5">
                    <div className="row">
                        <div className="col-12 col-md-4 offset-md-4">
                            <h2>Login</h2>
                            <Form onSubmit={this.handleLogin}> 
                                <FormGroup>
                                    <Label for="email"></Label>
                                    <Input type="text" name="email" id="email" innerRef={(input) => this.email = input} 
                                            valid = {required && validEmail}
                                            invalid = {required || validEmail}
                                            placeholder="Enter your email id"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password"></Label>
                                    <Input type="password" name="password" id="password" innerRef={(input) => this.password = input} 
                                        valid = {required==true ? true : false}
                                        placeholder="Enter your password"></Input>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" color="primary" className="loginButton" outline>Login</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

export default Login;