import React, { useState } from 'react';


function Signup() {
    const [username, setUserName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    async function createMyAccount() {
        // POST the form creds to the api for account creation
        const res = await fetch("http://localhost:8000/api/auth/signup");
        const resJ = await res.json();
        if(resJ.succ) {
            window.location.href = "http://localhost:3005/login";
        }
    }
    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 flex flex-col items-center'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Sign In to Create an Account</div>
                <div className='text-slate-600 dark:text-slate-200'>Keep your head strong and your password stronger</div>
            </div>
            <div>
                <form className='flex flex-col gap-4'>
                    <label htmlFor="username-input">Enter Username</label>
                    <input onChange={(e) => setUserName(e.target.value)} id="username-input" type="text" />
                    <label htmlFor="email-input">Enter E-mail</label>
                    <input onChange={(e) => setEmail(e.target.value)} id="email-input" type="email" />
                    <label htmlFor="password-input">Enter Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} id="password-input" type="password" />
                    <button onClick={createMyAccount} className='bg-green-600 dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md mt-4 p-3 text-lg text-slate-100 dark:text-slate-700  '>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup;
