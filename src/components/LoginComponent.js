import React, {Component} from 'react';
import Dashboard from './DashboardComponent';

class Login extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            validCredentials: false,
            invalidCredentials: ""
        }
    }

    validate = (name, value) => {

        let errorMssg = '';
        switch(name){

            case 'email' : 

                if(value.length > 0)
                {
                    let validEmail = /^([a-z0-9.-]+)@([a-z-]+)\.([a-z]{3,8})(.[a-z]{2-8})?$/; 
                    let isValid = validEmail.test(value);
                    if(!isValid)
                    {
                        errorMssg = "Invalid Email ID";
                    }
                }
                else
                {
                    errorMssg = "Required";
                }
                this.setState({emailError: errorMssg});
                break;

            case 'password' : 
                
                if(!value.length > 0)
                {
                    errorMssg = "Required";
                }
                this.setState({passwordError: errorMssg});
                break;

            default: break;

        }
        
    }

    handleChange = (event) => {
        
        var name = event.target.name;
        var value = event.target.value;
        
        this.validate(name,value);
        this.setState({[name]: value});


    }

    handleReset = () => {

        this.setState({
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            validCredentials: false,
            invalidCredentials: "",
        });


    }

    handleLogin = (event) => {

        event.preventDefault();
        
        if(this.state.email === ""  || this.state.password === "")
        {
            this.setState({ emailError: "Required", passwordError: "Required"});
        }
        else if(this.state.emailError !== ""  || this.state.passwordError !== "")
        {
            this.setState({ invalidCredentials:  "Invalid Credentials"});
        }
        else
        {
            if(this.state.password === "admin@123")
            {
                this.setState({ validCredentials: true, login: true });    
            }
            else
            {
                this.setState({ invalidCredentials: "Invalid Username/Password"})
            }
        }

    }

    render()
    {

        if(this.state.validCredentials)
        {
            return <Dashboard email={this.state.email}></Dashboard>
        }

        else
            return(
                <React.Fragment>
                    <div className="container d-flex align-items-center justify-content-center p-2 p-md-5">
                        <div className="row pt-5 pb-5 m-2 p-md-5 m-md-5 login">
                            <div className="col-12">
                                <h1>Login</h1> 
                            </div>
                            <div className="col-12">
                                <hr className="bg-light"></hr>
                                
                                <div>
                                    <span className={`fa ${this.state.invalidCredentials ?  'fa-times' : ''}`}>{' ' + this.state.invalidCredentials}</span>
                                </div>
                                <form onSubmit={this.handleLogin} onReset={this.handleReset}>
                                    <div className="form-group">
                                        <label htmlFor="email">Username{' '}</label>
                                        <span className="float-right"><span className={`fa ${this.state.emailError ? "fa-times" : ""}`}>{' ' + this.state.emailError}</span></span>
                                        <input type="text" className="form-control" name="email" id="email" placeholder="Email ID"
                                                onChange={this.handleChange}></input>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password{' '}</label>
                                        <span className="float-right"><span className={`fa ${this.state.passwordError ? "fa-times" : ""}`}>{' ' + this.state.passwordError}</span></span>
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Password"
                                                onChange={this.handleChange}></input>
                                        
                                    </div>
                                    <div className="form-group mt-5">
                                        <button type="submit" className="btn btn-outline-success offset-1 col-5 float-right text-white">Login</button>
                                        <button type="reset"  className="btn btn-outline-secondary col-5 text-white">Reset</button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
    }

}

export default Login;