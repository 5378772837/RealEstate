import React from 'react'
import '../../css/pages/SignIn.css'
import '../../css/reusables/positions.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

function SignIn(props) {


    const navigator = useNavigate()


    const signInChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser);
    };
    

    const signInSubmitHandler = () => {
        axios.post("http://localhost:8080/user/SignIn", props.user)
          .then((response) => {
            localStorage.setItem("userId", response.data.id)
            props.setUser(response.data)
            if(props.user.isAgent=== true){
            navigator("/Admin")}else{navigator("/")}
          })
          .catch((e) => {
            console.log(e)
          })
    
        }

    return (
        <div className='sign-in-content background center'>
            <div className='sign-in-box'>
                <div>Already A User?</div>
                <h1>Sign-In</h1>
                <div className='flex-row center'>
                    EMAIL
                    <input className='input-container' value={props.user.email} name='email' type='email' onChange={signInChangeHandler} ></input>
                </div>
                <div className='flex-row center'>
                    PASSWORD
                    <input className='input-container' value={props.user.password} name='password' type='password' onChange={signInChangeHandler} ></input>
                </div>
                <div className='flex-row center'>
                    <button onClick={signInSubmitHandler}>SUBMIT</button>
                </div>
            </div>

        </div>
    )
}

export default SignIn