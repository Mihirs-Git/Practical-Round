import React, {Component, useState} from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';

function DisplayUsers(props)
{
    return(
        <div className="container m-5">
            <div className="row">
                {props.users.map(user => {
                    return(
                        <div>
                            <p>{user.id}</p>
                            <p>{user.firstname}</p>
                            <p>{user.lastname}</p>
                            <p>{user.email}</p>
                            <img src={user.avatar} alt="user avatar"></img>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}


function Dashboard(props)
{
    const [users, getUsers] = useState(null);
    const getUsersURL =  'https://reqres.in/api/users';
    
    const fetchData = async () => {
        const response = await axios.get(getUsersURL);
        getUsers(response.data);
        console.log(users.data);
        console.log(response);
    }

    return(

        <React.Fragment>
            <div className="container">
                <div className="row p-5 text-white bg-dark">
                    <div className="col-12 col-md-10">
                        <h2 className="welcomeText">Welcome {' ' + props.email}</h2>    
                    </div> 
                    <div className="col-2 col-md-2">
                        <h2 className="avatar float-md-left"> {props.email[0]} </h2>
                    </div>
                </div>
            </div>
            <div className="container">            
                <Button onClick={fetchData}>Fetch Users</Button>
            </div>
            {/* <DisplayUsers users = {users.data}></DisplayUsers> */}
        </React.Fragment>

    );

}

export default Dashboard;