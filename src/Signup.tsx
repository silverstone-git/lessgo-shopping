import React from 'react';


function Signup() {
    return (
        <div className='flex justify-center items-center h-screen w-full text-slate-800 bg-slate-100 dark:text-slate-100 dark:bg-slate-800'>
            <div className=' mr-24 flex flex-col items-center'>
                <div className='text-3xl font-bold text-green-600 dark:text-green-300'>Sign In to Create an Account</div>
                <div className='text-slate-600 dark:text-slate-200'>Keep your head strong and your password stronger</div>
            </div>
            <div>
                <form action="" className='flex flex-col gap-4'>
                    <label htmlFor="username-input">Enter Username</label>
                    <input type="text" />
                    <label htmlFor="password-input">Enter Password</label>
                    <input type="password" />
                    <button className='bg-green-600 dark:bg-green-300 hover:bg-green-900 hover:dark:bg-green-100  rounded-md p-3 text-lg text-slate-100 dark:text-slate-700  '>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;