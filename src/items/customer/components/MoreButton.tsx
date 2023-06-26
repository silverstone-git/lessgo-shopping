import { useState } from "react";
import { setupExplore } from "../scripts/explore";
import { getScrollPosition } from "../../../common/scripts/dom";

export default function MoreButton(props: any) {
    const [getMoreVis, setMoreVis] = useState( getScrollPosition().viewportHeight > 600 ? true : false);
    window.addEventListener('scroll', (e) => {
        const scrollPercent = getScrollPosition();
        if (scrollPercent.relative > 0.9) {
            setMoreVis(true);
        }
    })
    if(getMoreVis) {
    return (
        <div className="w-full z-10 flex justify-center">
        <button onClick={() => {
            const tempPage = props.page + 1;
            props.setPage(tempPage);
            setupExplore(props.jwtToken, props.listOfItems, tempPage, props.setPage, props.setIsLoading, props.setSnackBarMessage, props.setLoggedIN, props.setJwtToken, props.setListOfItems, props.setNoOfItems)
        }} className="p-4 rounded-full fixed bottom-14 bg-green-500 text-slate-100 dark:bg-green-300 dark:text-slate-800">
            Load More
        </button>
        </div>
    )
    } else {
        return null;
    }
}