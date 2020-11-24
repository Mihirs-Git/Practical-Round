import Axios from 'axios';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Modal, ModalBody, ModalFooter, ModalHeader, Table } from 'reactstrap';

class Dashboard extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {

            users: [],
            fetched: false, 
            isModalOpen: false,
            isDropDownOpen: false,
            postUser: {
                id: '',
                username: '',
                job: ''
            },
            post_update_name_error: '',
            post_update_job_error: '',
            update: false,
            post: false

        }

    }

    componentDidMount()
    {
        this.getData();
    }

    dropDownToggle = () => {
        this.setState({isDropDownOpen: !this.state.isDropDownOpen});
    }
 
    deleteRecord = (id) => {
        
        Axios.delete('https://reqres.in/api/users/' + id)
        .then(() => {

            this.setState({
                users: this.state.users.filter(user => user.id !== id)
            })

        })
        .catch(err => console.log(err));
    
    }

    getData = () => {
        
        Axios.get('https://reqres.in/api/users')
        .then(res => this.setState({users: res.data.data, fetched: true}))
        .catch(err => console.log(err));

    }

    postUpdateData = () => {

        if(this.state.post === true)
        {
            if(this.state.postUser.name !== '' && this.state.postUser.job !== '')
            {
                Axios.post('https://reqres.in/api/users', {
                    name: this.state.postUser.username,
                    job: this.state.postUser.job
                })
                .then(res => {  
                    var newUser = {
                        id: res.data.id,
                        first_name: res.data.name,
                        last_name: res.data.job,
                        email: res.data.name.toLowerCase() + '.' + res.data.job.toLowerCase() + '@reqres.in',
                        avatar: ''
                    } 
                    return newUser;
                
                })
                .then((newUser) => this.state.users.push(newUser))
                .then(() => this.cancelModal())
                .catch(err => console.log(err));
            }
            else
            {
                var errMssg = "* Required";
                this.setState({post_update_name_error: errMssg, post_update_job_error: errMssg})
            }
        }
        else
        {
            if(this.state.postUser.name !== '' && this.state.postUser.job !== '')
            {
                Axios.put('https://reqres.in/api/users/' + this.state.postUser.id, {
                    name: this.state.postUser.username,
                    job: this.state.postUser.job
                })
                .then(res => {  
                    var newDetails = {
                        first_name: res.data.name,
                        last_name: res.data.job,
                        email: res.data.name.toLowerCase() + '.' + res.data.job.toLowerCase() + '@reqres.in',
                    } 
                    return newDetails;
                
                })
                .then((newDetails) => {

                    var updatingUserIndex = 0;
                    for(var i = 0; i < this.state.users.length; i++)
                    {
                        if(this.state.users[i].id === this.state.postUser.id)
                        {
                            updatingUserIndex = i ;
                        }
                    }
                    var updatingUser =  this.state.users.filter(user => user.id === this.state.postUser.id)[0];

                    var updatedUser = {
                        id: updatingUser.id,
                        first_name: newDetails.first_name,
                        last_name: newDetails.last_name,
                        email: newDetails.email,
                        avatar: updatingUser.avatar
                    }

                    let newUserList = this.state.users;
                    newUserList.splice(updatingUserIndex, 1, updatedUser);
                    this.setState({
                        users: newUserList
                    }); 


                })
                .then(() => this.cancelModal())
                .catch(err => console.log(err));
            }
            else
            {
                let errMssg = "* Required";
                this.setState({post_update_name_error: errMssg, post_update_job_error: errMssg})
            }
        }
        

    }

    validate = (name, value) => {

        var errMssg = '';
        if(!value.length > 0 || value === ' ')
        {
            errMssg = "* Required";
        }
        switch(name)
        {
            case 'username': 
                this.setState({post_update_name_error: errMssg});
                break;
            case 'job':        
                this.setState({post_update_job_error: errMssg});
                break;       
            default: break;
        }
    }

    handleChange = (event) => {

        var name = event.target.name;
        var value = event.target.value;

        this.validate(name, value);

        this.setState({postUser: {...this.state.postUser,  [name]: value } });
        

    }

    cancelModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen, post_update_job_error: ' ', post_update_name_error: ' ', postUser: {id: '', username: '', job: ''}, post: false, update: false});
    }

    toggleModalPost = () => {
        this.setState({isModalOpen: !this.state.isModalOpen, post_update_job_error: ' ', post_update_name_error: ' ', postUser: {username: '', job: ''}, post: true, update: false});
    }

    toggleModalUpdate = (id, name, job) => {
        this.setState({isModalOpen: !this.state.isModalOpen, post_update_job_error: ' ', post_update_name_error: ' ', postUser: {id: id, username: name, job: job}, post: false, update: true});
    }

    render()
    {

        const displayUsers = this.state.users.map(user => {

            if(this.state.fetched)
            {
                return(

                    <tr>
                        <th scope="row" >{user.id}</th>
                        <td>{user.email}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>
                            <img src={user.avatar} alt="Avatar"></img>
                        </td>
                        <td>
                            <span className="fa fa-edit update" onClick={() => this.toggleModalUpdate(user.id, user.first_name, user.last_name)}></span> 
                        </td>
                        <td>                               
                            <span className="fa fa-times delete" onClick={() => this.deleteRecord(user.id)}></span>
                        </td>
                    </tr>  
                );
            }
            else
            {
                return(
                    
                    <tr>
                      Fetching Data...
                    </tr> 
                );
            }

            

        });

        return(

            <React.Fragment>
                <div className="container-fluid">
                    <div className="row p-3 text-white bg-dark ">
                        <div className="col-10">
                            <h2 className="welcomeText">Welcome {this.props.email.split("@", 1)}</h2>    
                        </div> 
                        <div className="col-2 align-self-center">
                            <Dropdown isOpen={this.state.isDropDownOpen} toggle={this.dropDownToggle}>
                                <DropdownToggle caret className="avatar">
                                    {this.props.email[0]}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <NavLink to="/login" className="logout">
                                        <DropdownItem className="dropdown-item">
                                            Logout
                                        </DropdownItem>
                                    </NavLink>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.cancelModal}>
                        Add/Update Record 
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="username">Name</label>
                                <span className={`float-right fa ${this.state.post_update_name_error ? 'text-danger' : ''}`}>{this.state.post_update_name_error}</span>
                                <input type="text" id="username" name="username" placeholder="Enter Your Name" className="form-control" onChange = {this.handleChange} value = {this.state.postUser.username}></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="job">Job</label>
                                <span className={`float-right fa ${this.state.post_update_job_error ? 'text-danger' : ''}`}>{this.state.post_update_job_error}</span>
                                <input type="text" id="job" name="job" placeholder="Enter Your Job" className="form-control"
                                    onChange = {this.handleChange} value = {this.state.postUser.job}></input>
                            </div> 
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button type="submit" className="btn btn-outline-success" onClick={this.postUpdateData}>Submit</button>
                        <button type="cancel" className="btn btn-outline-danger" onClick={this.cancelModal}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <div className="container">
                    <div className="row mt-3">
                        <div className="col-12 mb-3">
                            <button className="btn btn-success float-right" onClick={this.toggleModalPost}>Add Record</button> 
                        </div>
                        <div className="col-12">
                            <Table striped dark borderless>
                                <thead>
                                    <tr>
                                        <th>
                                            ID
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            First Name
                                        </th>
                                        <th>
                                            Last Name
                                        </th>
                                        <th>
                                            Avatar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayUsers}
                                </tbody>                            
                            </Table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );

    }

}

export default Dashboard;