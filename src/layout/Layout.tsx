import {Outlet} from "react-router-dom";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import '../output_style/output.css';
import ItemMasterRoute from "../routes/ItemMasterRoute";
import LogOutRoute from '../routes/LogOutRoute';
import AppRoute from '../routes/AppRoute';
import { checkJWTFromStorage, checkLoggedIn } from "../common/scripts/auth_repository";
import ProfileDropDown from "./ProfileDropDown";
import YourCartButton from "../common/components/YourCartButton";
import OrdersRoute from "../routes/OrdersRoute";

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
	const [username, setUsername] = useState("");
	const [dp, setDp] = useState("");
  const [isVendor, setIsVendor] = useState(false);

  // checkJWTFromStorage();
	useEffect(() => {
    checkJWTFromStorage(setLoggedIN, setJwtToken);
    checkLoggedIn(localStorage.jwtToken, setLoggedIN, setUsername, setIsVendor, undefined, setDp);
  }, []);


  return (
    <>

      <nav className="hidden p-8 md:flex top-0 left-0 justify-between bg-green-300 text-slate-800">
        <div className="flex gap-8">
          <div className="text-4xl font-fasthand font-extrabold">Lessgo</div>
          <AppRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
          <ItemMasterRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn, "isVendor": isVendor}} />
          <OrdersRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn, isVendor: isVendor}} />
          <LogOutRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
        </div>
        <div className="gap-4 flex items-center">
          <FontAwesomeIcon className=' hidden dark:inline relative right-2 cursor-pointer' icon={icon({name: 'moon', style: 'solid'})} onClick={toggleDarkMode} />
          <FontAwesomeIcon className='inline dark:hidden relative right-2 cursor-pointer' icon={icon({name: 'sun', style: 'solid'})} onClick={toggleDarkMode} />
          <div className="hidden md:block ml-4">
            <YourCartButton auth={jwtToken} isVendor={isVendor} />
          </div>
          <div className="z-20">
            <ProfileDropDown {...{loggedIn: loggedIn, isVendor: isVendor, username: username, dp: dp}}/>
          </div>
        </div>
      </nav>
      <div className=' absolute right-8 top-8 md:hidden flex items-center '>
        <FontAwesomeIcon className='text-white hidden dark:inline relative right-2 cursor-pointer' icon={icon({name: 'moon', style: 'solid'})} onClick={toggleDarkMode} />
        <FontAwesomeIcon className='text-slate-800 inline dark:hidden relative right-2 cursor-pointer' icon={icon({name: 'sun', style: 'solid'})} onClick={toggleDarkMode} />
        <div className="hidden md:block ml-4">
          <YourCartButton auth={jwtToken} isVendor={isVendor} />
        </div>
        <div className="z-20">
          <ProfileDropDown {...{loggedIn: loggedIn, isVendor: isVendor, username: username, dp: dp}}/>
        </div>
      </div>
      <Outlet />
      <nav className=" fixed py-4 px-8 bg-green-600 dark:bg-green-300 text-slate-100 dark:text-slate-800 bottom-0 flex justify-between w-full md:hidden list-none flex-row z-10">
            <AppRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
            <ItemMasterRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn, "isVendor": isVendor}} />
            <LogOutRoute {...{"jwtToken": jwtToken, "loggedIn": loggedIn}} />
      </nav>
    </>

    )
}

export default Layout;