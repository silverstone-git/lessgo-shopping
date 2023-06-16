import React, { useEffect, useState } from 'react';
import Snacc from './common/components/SnackBarComponent';
import Loading from './common/components/Loading';
import { getBackendLocation, getFrontendLocation } from './common/scripts/urls';



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [submitButtonDark, setSubmitButtonDark] = useState(0);
    const [loggedIn, ] = useState(localStorage.loggedIn);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(loggedIn === "true") {
            window.location.href = `${getFrontendLocation()}/home`;
        }
    })

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
            window.location.href = `${getFrontendLocation()}/home`;
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



    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 flex-col items-center md:flex hidden'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Welcome Back</div>
                <div className='text-slate-600 dark:text-slate-200'>Log back into your Account</div>
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
                </form>
                <div className=' mt-8 text-sm text-slate-500 '>Create a new account <a className='text-green-600 dark:text-green-300 hover:opacity-80' href='/signup'>here</a></div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
            <Loading {...{"isLoading": isLoading}} />
        </div>
    )
}

export default Login;
