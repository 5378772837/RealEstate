import React from 'react'
import '../../css/pages/SignIn.css'
import '../../css/reusables/positions.css'
import axios from 'axios';
import { useNavigate } from 'react-router';

function SignUp(props) {


    const navigator = useNavigate()

    const signUpChangeHandler = (event) => {
        const name = event.target.name;
        let value;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
 
        } else {
            value = event.target.value;
        }
        const tempUser = { ...props.user };
        tempUser[name] = value;
        props.setUser(tempUser);
    };

  const signUpSubmitHandler = () => {
    console.log(props.user.isAgent)
    axios.post("http://localhost:8080/user/SignUp", props.user)
      .then((response) => {
        localStorage.setItem("userId", response.data.id)
        props.setUser(response.data)
        navigator("/")
      })
      .catch((e) => {
        console.log(e)
      })
    }

    return (
        <div className='sign-in-content background center'>
            <div className='sign-in-box center'>
                <div>
                    New User? Sign-up Today!
                </div>
                <h1>Sign-Up</h1>
                <div className='flex-row center'>
                    EMAIL
                    <input className='input-container'  value={props.user.email} name='email' type='email' onChange={signUpChangeHandler} ></input>
                </div>
                <div className='flex-row center'>
                    PASSWORD
                    <input className='input-container' value={props.user.password} name='password' type='password' onChange={signUpChangeHandler} ></input>
                </div>
                <div className='flex-row center'>
                    NAME
                    <input className='input-container' value={props.user.name} name='name' type='name' onChange={signUpChangeHandler} ></input>
                </div>
                <div className='flex-row center'>
                    <div>Check box if you are an Agent</div>
                    <input type="checkbox" name="isAgent" checked={props.user.isAgent} onChange={signUpChangeHandler}/>
                </div>
                <div className='flex-row center'>
                    <button onClick={signUpSubmitHandler}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}
export default SignUp