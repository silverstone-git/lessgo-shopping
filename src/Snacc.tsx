
function Snacc(props: any) {
    if(props.message) {
        return (
            <div className="absolute flex justify-center items-center font-bold bottom-12 h-12 w-4/5 text-slate-200 dark:bg-slate-900 bg-green-500 border-green-600 border rounded">
                {props.message}
            </div>
        )
    } else {
        return null;
    }
}

export default Snacc;