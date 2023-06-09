export default function Loading(props: any) {
    // returns the loading icon, acc to the property
    // a dim screen all over the area at which it is placed
    // and the loading icon at the center
    // works on property - isLoading: true
    if(props.isLoading) {
        return(
            <div className="w-full h-full opacity-70 font-extrabold text-3xl text-slate-800 dark:text-slate-200 z-10">
                <div className="z-20"> Loading ...</div>
            </div>
        )
    } else {
        return null;
    }
}