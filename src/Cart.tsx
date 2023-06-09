import Forbidden from "./Forbidden"

export default function Cart(props: any) {
    let loggedIn = true;
    if(loggedIn) {
        //
        return(
            
            <div className='flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-800
            h-screen w-full text-slate-800 dark:text-slate-100'>
                Your Cart Items:
            </div>
        )
    } else {
        return (
            <Forbidden />
        )
    }
}