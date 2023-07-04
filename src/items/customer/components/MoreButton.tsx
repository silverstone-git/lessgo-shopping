import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { setupExplore } from "../scripts/explore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MoreButton(props: any) {
    // const [getMoreVis, setMoreVis] = useState( getScrollPosition().viewportHeight > 600 ? true : false);
    if(props.getMoreVis && !props.exploreEnd) {
    return (
        <div className="w-full z-10 flex justify-center fixed bottom-14 md:bottom-4 ">
        <button onClick={() => {
            const tempPage = props.page + 1;
            props.setPage(tempPage);
            setupExplore(props.jwtToken, props.listOfItems, tempPage, props.setPage, props.setIsLoading, props.setSnackBarMessage, props.setLoggedIN, props.setJwtToken, props.setListOfItems, props.setNoOfItems, props.category, props.setExploreEnd)
        }} className="p-4 flex gap-2 items-center rounded-full bg-green-500 text-slate-100 dark:bg-green-300 dark:text-slate-800">
            <FontAwesomeIcon icon={icon({name: 'ellipsis', style: 'solid'})} />
            More
        </button>
        </div>
    )
    } else {
        return null;
    }
}