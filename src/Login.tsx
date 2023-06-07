import React, { useEffect, useState } from 'react';
import Snacc from './Snacc';



function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [submitButtonDark, setSubmitButtonDark] = useState(0);
    const [loggedIn, setLoggedIN] = useState(localStorage.loggedIn);

    useEffect(() => {
        if(loggedIn === "true") {
            window.location.href = "http://localhost:3005/dashboard"
        }
    })

    function showSnackBar(message: string) {
        setSnackBarMessage(message)
        setTimeout(() => {
            setSnackBarMessage("");
        }, 3000)
    }

    async function logMeIn() {
        // console.log("bro login ho raha h")

        // TODO: A progess bar starts here
        setSubmitButtonDark(1);

        // TODO: updation of state is only one way, need a method to update
        // the input field values according to the frontend state instead of the opposite
        // setUserName("");
        // setPassword("");

        const res = await fetch("http://localhost:8000/api/auth/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });
        const resJ = await res.json();
        // console.log("bro login hogya h")
        localStorage.setItem("jwtToken", resJ.Authorization);
        localStorage.setItem("loggedIn", 'true');
        if(resJ.succ) {
            window.location.href = "http://localhost:3005/dashboard";
        } else {
            showSnackBar(resJ.message);
            console.log("Login Failure");
            console.log(`message to be shown is: ${resJ.message}`)
        }
        setSubmitButtonDark(0);

        // TODO: a progress bar ends here
    }


    function SubmitButton(props: any) {
        if(props.isDark) {
            //
            return (
                <button onClick={logMeIn} className='bg-green-900 dark:bg-green-700 hover:bg-green-800 hover:dark:bg-green-100  rounded-md p-3 mt-4 text-lg text-slate-100 dark:text-slate-700'>
                    Submit
                </button>
            )
        } else {
            // show a nice colorful submit button
            return (
                <button onClick={logMeIn} className='bg-green-600 dark:bg-green-300 hover:bg-green-800 hover:dark:bg-green-100  rounded-md p-3 mt-4 text-lg text-slate-100 dark:text-slate-700'>
                    Submit
                </button>
            )
        }
    }



    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 flex flex-col items-center'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Welcome Back</div>
                <div className='text-slate-600 dark:text-slate-200'>Log back into your Account</div>
            </div>
            <div>
                <div className='flex flex-col gap-4'>
                    <label htmlFor="username-input">Enter Username</label>
                    <input onChange={(e) => setUserName(e.target.value)} type="text" />
                    <label htmlFor="password-input">Enter Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    <SubmitButton {...{"isDark": submitButtonDark}} />
                </div>
                <div className=' mt-8 text-sm text-slate-500 '>Create a new account <a className='text-green-600 dark:text-green-300 hover:opacity-80' href='/signup'>here</a></div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
        </div>
    )
}

export default Login;
