import React from 'react'
import Header from './Header'

function PageWrapper(props) {
  return (
    <div className='flex-col container'>
    <div className='flex-row header'>
      	<Header user={props.user} setUser={props.setUser}/>
      </div>
      <div className='flex-row background page'>
    	{props.children}
      </div>

    </div>
  )
}

export default PageWrapper