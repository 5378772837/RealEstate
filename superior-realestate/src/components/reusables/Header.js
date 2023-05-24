import React from 'react';
import '../../css/reusables/header.css'
import '../../css/reusables/positions.css'
import { useNavigate } from 'react-router-dom';

function Header(props) {


    
  const navigator = useNavigate()
  
  const signOut = () => {
    localStorage.removeItem("userId")
    props.setUser({
      id: undefined,
      userName: "",
      password: "",
      isAgent: false

    })
    navigator("/")
  }



  const renderHeader = () => {


    if (props.user.id !== undefined&&props.user.isAgent===true) {

    return (
        <div className='header'>
            <div className='third-width '>
                <a href="/"> <img className='logo' src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg" /></a>
            </div>
            <div>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div>
                <a href="/Properties">
                    <div className='header-link'>PROPERTIES</div>
                </a>
            </div>
            <div>
                <a href="/Admin">
                    <div className='header-link'>ADMIN</div>
                </a>
            </div>
            <div className='header-link' onClick={signOut}>SIGN OUT</div>
        </div>
    )
    }else if(props.user.id !== undefined&&props.user.isAgent===false){
        return (
            <div className='header'>
            <div>
                <a href="/"> <img className='logo' src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg" /></a>
            </div>
            <div>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div>
                <a href="/Properties">
                    <div className='header-link'>PROPERTIES</div>
                </a>
            </div>
            <div className='header-link 'onClick={signOut}>SIGN-OUT</div>
        </div>
        )

    } else {
        return (
            <div className='header'>
            <div className='third-width'>
                <a href="/"> <img className='logo' src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/real-estate-logo-design.jpg" /></a>
            </div>
            <div>
                <a href="/">
                    <div className='header-link'>HOME</div>
                </a>
            </div>
            <div>
                <a href="/PROPERTIES">
                    <div className='header-link'>PROPERTIES</div>
                </a>
            </div>
            <div>
                <a href="/SignIn">
                    <div className='header-link'>SIGN-IN</div>
                </a>
            </div>
            <div>
                <a href="/SignUp">
                    <div className='header-link'>SIGN-UP</div>
                </a>
            </div>
   
        </div>
    )
}
  }
return(
    renderHeader()
)
  
}
export default Header;