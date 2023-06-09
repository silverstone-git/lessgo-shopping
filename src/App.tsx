import React, { useEffect, useState } from 'react';
// require('dotenv').config()
// import './output_style/output.css';

function App() {

  const [loggedIn] = useState(localStorage.loggedIn);
  useEffect(
    () => {
      if(loggedIn === 'true') {
        if(window.location.href.search('localhost') === -1) {
          window.location.href = `${process.env.REACT_APP_LOCAL_SERVER}:3005/dashboard/`;
        } else {
          //
          window.location.href = `${process.env.REACT_APP_CUR_SERVER}:3005/dashboard/`;
        }
      }
    }
  )

  return (
    <div id='app'>

    <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
    h-screen w-full'>
      <div className='font-bold text-3xl text-green-600 dark:text-green-300'>
      Welcome to Less Go
      </div>
      <div className='text-md text-slate-600 dark:text-slate-200'>
      Sign In to enjoy seamless shopping
      </div>
      </div>
    {/* <div className='flex justify-center items-center bg-slate-100 dark:bg-slate-800 h-screen w-full'><div className='font-bold text-3xl text-green-600 dark:text-green-300'>Hemlo WOrld</div></div> */}
    </div>
  );
}

export default App;
