
function Snacc(props: any) {
    if(props.message) {
        return (
            <div onClick={(e) => {
                (e.target as HTMLElement).style.display = "none";
            }} className="absolute flex justify-center items-center font-bold bottom-20 md:bottom-12 h-12 md:w-4/5 w-11/12 dark:text-slate-200 text-green-300 dark:bg-slate-900 bg-slate-100 border-green-600 border rounded">
                {props.message}
            </div>
        )
    } else {
        return null;
    }
}

export default Snacc;