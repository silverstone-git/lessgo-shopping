export default function ProfileDropDown(props: any) {
    if(props.loggedIn && props.isVendor) {
        return (
            <div onClick={() => {
                // showing account settings and stuff for the vendor
            }} className="text-slate-800 dark:text-slate-100 ml-4 font-bold cursor-pointer">{props.username.split(' ')[0].length < 10 ? props.username.split(' ')[0] : `${props.username.split(' ')[0]}...`}</div>
        )
    } else if(props.loggedIn){
        //
        return (
            <div onClick={() => {
                // showing your orders, your cart, listing, etc.
            }} className="text-slate-800 dark:text-slate-100 ml-4 font-bold cursor-pointer">{props.username.split(' ')[0].length < 10 ? props.username.split(' ')[0] : `${props.username.split(' ')[0]}...`}</div>
        )
    } else {
        return null;
    }
}