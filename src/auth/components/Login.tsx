import React, { useEffect, useState } from 'react';
import Snacc from '../../common/components/SnackBarComponent';
import Loading from '../../common/components/Loading';
import { getBackendLocation, getFrontendLocation } from '../../common/scripts/urls';
import { GoogleLogin } from '@react-oauth/google';
import { loginSucc, setProfileFromUser } from '../scripts/google_login';



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

    useEffect(() => {
        if(loggedIn === "true") {
            window.location.href = `${getFrontendLocation()}/home/`;
        } else {
            //
        }
        if(googleUser) {
            setProfileFromUser(googleUser, setGoogleProfile, setIsLoading, setSnackBarMessage);
        }
        // loadScript('https://accounts.google.com/gsi/client');
    }, [googleUser])

    function showSnackBar(message: string) {
        setSnackBarMessage(message)
        setTimeout(() => {
            setSnackBarMessage("");
        }, 3000)
    }

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
            window.location.href = `${getFrontendLocation()}/home/`;
        } else {
            showSnackBar(resJ.message);
            console.log("Login Failure");
            console.log(`message to be shown is: ${resJ.message}`)
        }
        setSubmitButtonDark(0);

    }


    function SubmitButton(props: any) {
        if(props.isDark) {
            //
            return (
                <button type='submit' className='bg-green-900 dark:bg-green-700 hover:bg-green-800 hover:dark:bg-green-100  rounded-md p-3 mt-4 text-lg text-slate-100 dark:text-slate-700'>
                    Submit
                </button>
            )
        } else {
            // show a nice colorful submit button
            return (
                <button type='submit' className='bg-green-600 dark:bg-green-300 hover:bg-green-800 hover:dark:bg-green-100  rounded-md p-3 mt-4 text-lg text-slate-100 dark:text-slate-700'>
                    Submit
                </button>
            )
        }
    }

    console.log(googleProfile);

    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 flex-col items-center md:flex hidden'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Welcome Back</div>
                <div className='text-slate-600 dark:text-slate-200'>Log back into your Account</div>
            </div>
            <div>
                <form className='flex flex-col gap-4' action='' onSubmit={async (e) => {
                  e.preventDefault();
                  (e.target as HTMLFormElement).reset();
                  await logMeIn();
                }}>
                    <label htmlFor="email-input">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" />
                    <label htmlFor="password-input">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    <SubmitButton {...{"isDark": submitButtonDark}} />
                    {/* <button onClick={() => {}} className='p-4 dark:bg-green-300 dark:text-slate-800 bg-green-500 text-slate-100 rounded-full '>Login / Signup with google</button> */}
                    <GoogleLogin theme={localStorage.getItem('theme') === 'dark' ? 'filled_black' : 'filled_blue'} onSuccess={(val) => loginSucc(val, setGoogleUser)} onError={() => console.log("error while login")} useOneTap />
                    {/*

                    COMMENTED BECAUSE IT REQUIRES A GLOBAL HANDLER FUNCTION


                     <div id="g_id_onload"
                        data-client_id={process.env.REACT_APP_GOAUTH_CLID}
                        data-context="signin"
                        data-ux_mode="popup"
                        data-callback="handleAuthentication"
                        data-nonce=""
                        data-auto_select="true"
                        data-itp_support="true">
                    </div>

                    <div className="g_id_signin"
                        data-type="standard"
                        data-shape="rectangular"
                        data-theme={`filled_${localStorage.getItem('theme') === 'dark'? 'black': 'blue'}`}
                        data-text="signin_with"
                        data-size="large"
                        data-logo_alignment="left">
                    </div> */}
                </form>
                <div className=' mt-8 text-sm text-slate-500 '>Create a new account <a className='text-green-600 dark:text-green-300 hover:opacity-80' href='/signup'>here</a></div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
    )
}

export default Login;
