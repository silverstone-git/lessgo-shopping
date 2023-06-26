import { getFrontendLocation } from "../../common/scripts/urls";

function SnaccSignup(props: any) {
    if(props.message) {
        return (
            <div onClick={() => {
                window.location.href = `${getFrontendLocation()}/login/`
            }} className="fixed flex z-10 justify-center items-center font-bold bottom-20 md:bottom-12 h-12 md:w-4/5 w-11/12 dark:text-slate-200 text-green-100 dark:bg-slate-900 bg-green-500 dark:border-green-600 border rounded">
                {props.message}
            </div>
        )
    } else {
        return null;
    }
}

export default SnaccSignup;