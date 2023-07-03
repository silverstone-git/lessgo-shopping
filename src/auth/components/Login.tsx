import React, { useEffect, useState } from 'react';
import Snacc from '../../common/components/SnackBarComponent';
import Loading from '../../common/components/Loading';
import { getBackendLocation, getFrontendLocation } from '../../common/scripts/urls';
import { GoogleLogin } from '@react-oauth/google';
import { getCartFromLocal, loginSucc, setProfileFromUser } from '../scripts/google_login';
import { useParams } from "react-router-dom";
import { showSnackBar } from '../../common/scripts/snacc';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [submitButtonDark, setSubmitButtonDark] = useState(0);
    const [loggedIn, ] = useState(localStorage.loggedIn);
    const [isLoading, setIsLoading] = useState(false);
    let breh: any = undefined;
    const [googleUser, setGoogleUser] = useState(breh);
    const [googleProfile, setGoogleProfile] = useState(breh);
    let { exitCode } = useParams();

    async function setupLogin(googleUser: any, loggedIn: string, exitCode: string | undefined) {
        showSnackBar(exitCode === '201' ? 'Account Successfully Created' : '', setSnackBarMessage);
        showSnackBar(exitCode === '404' ? 'Please login to proceed to checkout!' : '', setSnackBarMessage);
        if(loggedIn === "true") {
            window.location.href = `${getFrontendLocation()}/home/`;
        } else {}
        if(googleUser) {
            await setProfileFromUser(googleUser, setGoogleProfile, setIsLoading, setSnackBarMessage);
            exitCode === '404' ? await getCartFromLocal(setIsLoading) : void 0;
            window.location.href = `${getFrontendLocation()}/${exitCode === '404' ? 'cart' : 'home'}/`;
        }
    }

    useEffect(() => {
        setupLogin(googleUser, loggedIn, exitCode);
    }, [googleUser, loggedIn, exitCode])

    async function logMeIn() {

        setIsLoading(true);
        setSubmitButtonDark(1);

        // TODO: updation of state is only one way, need a method to update
        // the input field values according to the frontend state instead of the opposite
        const fetchLocation = getBackendLocation();
        const res = await fetch(`${fetchLocation}/api/auth/login/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        const resJ = await res.json();
        setIsLoading(false)

        if(resJ.succ) {

            localStorage.setItem("jwtToken", resJ.Authorization);
            localStorage.setItem("loggedIn", 'true');
            exitCode === '404' ? await getCartFromLocal(setIsLoading) : void 0;
            window.location.href = `${getFrontendLocation()}/${exitCode === '404' ? 'cart' : 'home'}/`;
        } else {
            showSnackBar(resJ.message, setSnackBarMessage);
        }
        setSubmitButtonDark(0);

        return resJ.succ ? true : false;

    }


    function SubmitButton(props: any) {
        if(props.isDark) {
            //
            return (
                <button type='submit' className='bg-green-900 dark:bg-green-700 hover:bg-green-800 hover:dark:bg-green-100  rounded-md p-3 mt-4 text-lg text-slate-100 dark:text-slate-700'>
                    Login
                </button>
            )
        } else {
            // show a nice colorful submit button
            return (
                <button type='submit' className='bg-green-600 dark:bg-green-300 hover:bg-green-800 hover:dark:bg-green-100  rounded-md p-3 mt-4 text-lg text-slate-100 dark:text-slate-700'>
                    Login
                </button>
            )
        }
    }

    return (
        <div className='flex justify-center items-center h-[90vh] w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 md:block hidden  text-8xl font-logo text-green-600 dark:text-green-300'>
                {/* <div className=''> */}
                    Lessgo
                {/* <div className='text-slate-600 dark:text-slate-200'>Log back into your Account</div> */}
            </div>
            <div>
                <form className='flex flex-col gap-4' action='' onSubmit={async (e) => {
                  e.preventDefault();
                  await logMeIn();
                }}>
                    <label htmlFor="email-input">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" />
                    <label htmlFor="password-input">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    <SubmitButton {...{"isDark": submitButtonDark}} />
                    {/* <button onClick={() => {}} className='p-4 dark:bg-green-300 dark:text-slate-800 bg-green-500 text-slate-100 rounded-full '>Login / Signup with google</button> */}
                    <GoogleLogin theme={localStorage.getItem('theme') === 'dark' ? 'filled_black' : 'filled_blue'} onSuccess={(val) => loginSucc(val, setGoogleUser)} onError={() => console.log("error while login")} useOneTap />
                </form>
                <div className=' mt-8 text-sm text-slate-500 '>New to Lessgo? <a className='text-green-600 dark:text-green-300 hover:opacity-80' href='/signup'>Create an account</a></div>
                <div onClick={() => {showSnackBar("This feature is being worked on rn", setSnackBarMessage)}} className=' mt-8 text-sm text-green-600 dark:text-green-300 hover:opacity-80 cursor-pointer'>Forgot Password?</div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
    )
}

export default Login;
