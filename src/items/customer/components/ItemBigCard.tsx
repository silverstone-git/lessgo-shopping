import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import ReviewItem from "./ItemReview";
import { AddItemToCart } from "./AddItemToCart";
import UserReviews from "./UserReviews";
import { ItemPageVideo } from "./ItemPageVideo";

function ItemBigCard(props: any) {
    let navigate = useNavigate();

    // console.log("item to be rendered -> ", props.item);

    return(
        <div className=" flex justify-center w-full bg-slate-100 dark:bg-slate-800 pb-20">
        <div className="flex flex-col md:w-11/12 w-full">
            <div onClick={() => {
                navigate(-1);
            }} className=" cursor-pointer self-start pl-8 flex items-center text-md md:text-xl gap-4"><FontAwesomeIcon icon={icon({name: 'arrow-left', style: 'solid'})} /><div className=" font-bold text-sm sm:text-md md:text-xl">Back</div></div>
            <div id="item-image" className=" self-center mt-7 h-[40vh] md:w-1/2 w-full flex justify-center"><img src={props.item.image} alt="" className=" w-full object-contain" /></div>
            <div className="flex flex-col gap-6 md:pl-6 px-4 mt-4 md:mt-0">

                {props.item.oldPrice? <div className=" text-md text-opacity-70 line-through translate-y-2">{`₹${props.item.oldPrice}`}</div>: null }
                <div className=" text-xl font-bold">{`₹${props.item.priceRs}`}</div>
                <div className="text-lg">{props.item.itemName}</div>
                <div className="text-md">{props.item.description}</div>
                <div className="font-bold"> In {props.item.category}</div>
                <ItemPageVideo video={props.item.video} />
                <AddItemToCart {...{itemId: props.item.itemId, auth: props.auth, setSnackBarMessage: props.setSnackBarMessage, isVendor: props.isVendor ? true : false, alreadyAddedToCart: props.alreadyAddedToCart, setAlreadyAddedToCart: props.setAlreadyAddedToCart}} />
                <ReviewItem {...{"auth": props.auth, setIsLoading: props.setIsLoading, itemId: props.item.itemId, setSnackBarMessage: props.setSnackBarMessage}} />
                <UserReviews reviews={props.userReviewsList}  />
            </div>
        </div>
        </div>
    )
}

export default ItemBigCard