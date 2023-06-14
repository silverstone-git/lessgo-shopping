import {Outlet} from "react-router-dom";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './output_style/output.css';
import ItemMasterRoute from "./ItemMasterRoute";
import LogOutRoute from './LogOutRoute';
import AppRoute from './AppRoute';

function Layout() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light';
  }

  const [darkMode, setDarkMode] = useState(true ? localStorage.theme === 'dark': false);


  function toggleDarkMode(){
    // toggling dark mode
    setDarkMode(!darkMode);
  }
  if(darkMode) {
    localStorage.theme = 'dark'
    document.documentElement.classList.add('dark')
  } else {
    localStorage.theme = 'light'
    document.documentElement.classList.remove('dark')
  }



  const [jwtToken, setJwtToken] = useState(localStorage.jwtToken);
	const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);
  const [isVendor, setIsVendor] = useState(false);

  const checkJWTFromStorage = () => {
    const token = localStorage.getItem('jwtToken');
    if(token === '' || token === null || token === undefined) {
      setLoggedIN(false);
      setJwtToken("");
      localStorage.setItem('loggedIn', 'false');
      localStorage.setItem('jwtToken', "");
    } else {
      // if such a token exists, update the authorization status
      setLoggedIN(true);
      localStorage.setItem('loggedIn', 'true');
    }
  };



  const checkLoggedIn = (jwtToken: String) => {
		// to check if logged in at every render
    let fetchLocation: string | undefined;
    if(window.location.href.search('localhost') === -1) {
      fetchLocation = process.env.REACT_APP_LOCAL_SERVER;
    } else {
      fetchLocation = process.env.REACT_APP_CUR_SERVER;
    }
		fetch(`${fetchLocation}:8000/api/auth/isLoggedIn/`,
		{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({"Authorization": `${jwtToken}`}),
		},
		)
		.then((val) => val.json()).then((val: any) => {
			setLoggedIN(val.isLoggedIn);
      setIsVendor(val.isVendor);
      // setUsername(val.username);
		});
	};

  // checkJWTFromStorage();
	useEffect(() => {
    checkJWTFromStorage();
    checkLoggedIn(localStorage.jwtToken);
  }, []);


  return (
        <>
        <nav className="routenav hidden md:flex top-8 left-8 list-none flex-row gap-8 absolute text-slate-800 dark:text-slate-100">
            <AppRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
            <ItemMasterRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn, "isVendor": isVendor}} />
            <LogOutRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
        </nav>
    <div className=' absolute right-8 top-8 '>
<input
  className=" dont-pad-this-input mr-4 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
  type="checkbox"
  role="switch" onChange={toggleDarkMode} checked={darkMode} />
  <FontAwesomeIcon className='text-white hidden dark:inline' icon={icon({name: 'moon', style: 'solid'})} />
  <FontAwesomeIcon className='text-slate-800 inline dark:hidden' icon={icon({name: 'sun', style: 'solid'})} />
    </div>
        <Outlet />
        <nav className=" fixed py-4 px-8 bg-green-600 dark:bg-green-300 text-slate-100 dark:text-slate-800 bottom-0 flex justify-between w-full md:hidden list-none flex-row">
            <AppRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
            <ItemMasterRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn, "isVendor": isVendor}} />
            <LogOutRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
        </nav>
        </>

    )
}

export default Layout;