import React, { useEffect, useState } from 'react';
import CarouselDashboard from './CarouselDashboard';
// require('dotenv').config()
// import './output_style/output.css';

function App() {

  const [loggedIn] = useState(localStorage.loggedIn);
  const [carouselArray, setCarouselArray] = useState([['']]);
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
      setCarouselArray([
        ["https://picsum.photos/200/300", "Ah hell naw", "535754102"],
        ["https://picsum.photos/200/300", "Ah hell naw", "535754102"],
        ["https://picsum.photos/200", "Ah hell naw", "535754102"],
        ["https://picsum.photos/200", "Ah hell naw", "535754102"],
      ]);
    }, [loggedIn]
  )

  return (
    <div id='app'>

    <div className='flex flex-col items-center bg-slate-100 dark:bg-slate-800
    h-screen w-full'>
      <div className='font-bold md:text-3xl text-2xl mt-[15vh] text-green-600 dark:text-green-300'>
      Welcome to Less Go
      </div>
      <div className='md:text-md text-sm text-slate-600 dark:text-slate-200 mb-14'>
      Sign In to enjoy seamless shopping
      </div>
      <div className=' bg-slate-100 dark:bg-slate-800 w-full flex justify-center pb-14 md:pb-0'><CarouselDashboard {...{"listOfImages": carouselArray,}} /></div>
      </div>
    {/* <div className='flex justify-center items-center bg-slate-100 dark:bg-slate-800 h-screen w-full'><div className='font-bold text-3xl text-green-600 dark:text-green-300'>Hemlo WOrld</div></div> */}
    </div>
  );
}

export default App;
