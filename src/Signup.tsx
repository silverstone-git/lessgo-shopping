import React, { useState } from 'react';
import Snacc from './Snacc';


function Signup() {
    const [username, setUserName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [vendorReq, setVendor ] = useState("user");
    const [snackBarMessage, setSnackBarMessage] = useState("");

    function toggleVendor(vendorReq: string) {
        if(vendorReq === "vendor") {
            setVendor("user");
        } else {
            setVendor("vendor");
        }
    }

    function showSnackBar(message: string) {
        setSnackBarMessage(message);
        setTimeout(() => {
            setSnackBarMessage("");
        }, 3000)
    }

    async function createMyAccount() {
        // POST the form creds to the api for account creation
        const res = await fetch("http://localhost:8000/api/auth/create", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                "username": username,
                "email": email,
                "password": password,
                "vendorReq": vendorReq,
                "Authorization": localStorage.getItem('jwtToken'),
            })
        });
        const resJ = await res.json();
        if(resJ.succ) {
            showSnackBar(resJ.message);
        } else {
            showSnackBar(resJ.fail);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 flex flex-col items-center'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Sign In to Create an Account</div>
                <div className='text-slate-600 dark:text-slate-200'>Keep your head strong and your password stronger</div>
            </div>
            <div>
                <div className='flex flex-col gap-4'>
                    <label htmlFor="username-input">Enter Username</label>
                    <input onChange={(e) => setUserName(e.target.value)} id="username-input" type="text" />
                    <label htmlFor="email-input">Enter E-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email-input" type="email" />
                    <label htmlFor="password-input">Enter Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="password-input" type="password" />
                    <div className='flex gap-4'>
                        <label htmlFor="vendor-input">Check this if you are a seller!</label>
                        <input className='inline' onClick={(e) => toggleVendor(vendorReq)} id="vendor-input" type="checkbox" />
                    </div>
                    <button onClick={createMyAccount} className='bg-green-600 dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md mt-4 p-3 text-lg text-slate-100 dark:text-slate-700  '>
                        Submit
                    </button>
                </div>
            </div>
            <Snacc {...{"message": snackBarMessage}} />
        </div>
    )
}

export default Signup;
