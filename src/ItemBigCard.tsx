import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ReviewItem from "./ItemReview";

function ItemBigCard(props: any) {
    let navigate = useNavigate();
    return(
        <div className="flex flex-col md:w-11/12 w-full">
            <div onClick={() => {
                navigate(-1);
            }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>
            <div id="item-image" className=" mt-7 h-[40vh] w-full flex justify-center"><img src={props.item.image} alt="" className=" object-cover" /></div>
            <div className="text-xl">{props.item.itemName}</div>
            <div className="text-md">{props.item.description}</div>
            <div className="font-bold"> In {props.item.category}</div>
            <ReviewItem {...{"auth": props.auth}} />
        </div>
    )
}

export default ItemBigCard