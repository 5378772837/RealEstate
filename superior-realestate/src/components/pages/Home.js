

import React from 'react'
import '../../css/pages/home.css'
import '../../css/reusables/positions.css'

function Home(props) {
  console.log("USER ID", props.user.id);
  return (
    
    <div className='flex-col fill center'>
 
      <h2 className='flex-row justify-content-center'>Welcome to Superior RealEstate!</h2>
      <h3 className='flex-row justify-content-center'>Let us help you find the home you have always dreamed of! Your future starts now!</h3>


    </div>


  )
}

export default Home
