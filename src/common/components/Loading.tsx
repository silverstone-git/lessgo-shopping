export default function Loading(props: any) {
    // returns the loading icon, acc to the property
    // a dim screen all over the area at which it is placed
    // and the loading icon at the center
    // works on property - isLoading: true
    if(props.isLoading) {
        return(
            <>
            {/* <div className="fixed h-screen w-screen top-0 left-0 opacity-30 bg-slate-800 dark:bg-slate-200 z-10">
            </div> */}
            <div className="fixed h-screen w-screen top-0 left-0 mt-[47vh] ml-[47vw] font-extrabold text-3xl z-20 text-slate-950 dark:text-slate-50">
                <div className="lds-ring"><div className="lds-ring-div dark:lds-ring-dark-div"></div><div></div><div></div><div></div></div>
            </div>
            </>
        )
    } else {
        return null;
    }
}