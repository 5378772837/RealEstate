

import React from 'react'
import '../../css/pages/home.css'
import '../../css/reusables/positions.css'

function Home(props) {
  console.log("USER ID", props.user.id);
  return (
    
    <div className='flex-col fill center'>
      <div className='message-col justify-content-center'>
        <h1 className='flex-row center'>Welcome to Superior RealEstate!</h1>
        <h2 className='flex-row center'>Let us help you find the home you have always dreamed of! Your future starts now!</h2>
      </div>
      <div className='body-row'></div>

    </div>


  )
}

export default Home
