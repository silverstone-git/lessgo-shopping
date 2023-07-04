import React, { useEffect, useState } from 'react';
import Loading from '../../common/components/Loading';
import { getFrontendLocation } from '../../common/scripts/urls';
import SnaccSignup from './SnaccWithCallBack';
import { createMyAccount } from '../../common/scripts/auth_repository';
import { GoogleLogin } from '@react-oauth/google';
import { loginSucc, setProfileFromUser } from '../scripts/google_login';


function Signup() {
    const [username, setUserName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [password2, setPassword2 ] = useState("");
    const [vendorReq, setVendor ] = useState("user");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    let breh: any = undefined;
    const [googleUser, setGoogleUser] = useState(breh);
    // eslint-disable-next-line
    const [googleProfile, setGoogleProfile] = useState(breh);

    const [loggedIn, ] = useState(localStorage.loggedIn);

    function toggleVendor(vendorReq: string) {
        if(vendorReq === "vendor") {
            setVendor("user");
        } else {
            setVendor("vendor");
        }
    }

    useEffect(() => {
        if(loggedIn === "true") {
            window.location.href = `${getFrontendLocation()}/home/`
        }
        if(googleUser) {
            setProfileFromUser(googleUser, setGoogleProfile, setIsLoading, setSnackBarMessage);
        }
    }, [loggedIn, googleUser])


    return (
        <div className='flex justify-center items-center pb-28 md:h-[90vh] w-full pt-28 md:pt-14 px-4 text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 md:flex hidden flex-col items-center'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Sign In to Create an Account</div>
                    {/* <div className=' text-sm text-slate-500 '></div> */}
                <div className='text-slate-600 dark:text-slate-400'>Keep your head strong and your password stronger</div>
            </div>
            <div className=' px-4 sm:px-8 md:px-0 w-full md:w-auto'>
                <form className='flex flex-col gap-4' onSubmit={async (e) => {
                    e.preventDefault();
                    const succ = await createMyAccount(setIsLoading, setSnackBarMessage, username, email, password, password2, vendorReq);
                    if(succ) {
                        (e.target as HTMLFormElement).reset();
                        window.location.href = `${getFrontendLocation()}/login/201`;
                    }
                    
                }}>
                    <label htmlFor="name-input">Enter Name</label>
                    <input onChange={(e) => setUserName(e.target.value)} id="name-input" type="text" />
                    <label htmlFor="email-input">Enter E-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email-input" type="email" />
                    <label htmlFor="password-input">Enter Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="password-input" type="password" />
                    <label htmlFor="password-confirm">Confirm Pasword</label>
                    <input onChange={(e) => setPassword2(e.target.value)} id="password-confirm" type="password" />
                    <div className='md:flex gap-4 hidden'>
                        <label htmlFor="vendor-input">Check this if you are a seller!</label>
                        <input className='inline' onClick={(e) => toggleVendor(vendorReq)} id="vendor-input" type="checkbox" />
                    </div>
                    <div className='md:hidden gap-4 flex'>
                        <label htmlFor="vendor-input">Lessgo Seller Account</label>
                        <input className='inline' onClick={(e) => toggleVendor(vendorReq)} id="vendor-input" type="checkbox" />
                    </div>
                    <div className='w-full flex flex-col gap-4 items-center'>
                    <button type='submit' className='bg-green-600 w-full dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md mt-4 p-3 text-lg text-slate-100 dark:text-slate-700 '>
                        Signup
                    </button>
                    {vendorReq === 'vendor' ? null : <GoogleLogin theme={localStorage.getItem('theme') === 'dark' ? 'filled_black' : 'filled_blue'} onSuccess={(val) => loginSucc(val, setGoogleUser)} onError={() => console.log("error while login")} useOneTap />}
                    </div>
                </form>
            </div>
            <SnaccSignup message={snackBarMessage} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
    )
}

export default Signup;
