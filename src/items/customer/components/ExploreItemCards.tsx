import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShoppingCart from "../../../cart/components/ShoppingCart";
import Snacc from "../../../common/components/SnackBarComponent";
import Loading from "../../../common/components/Loading";
import { changeCount } from "../../../cart/scripts/cart_repository";
import { getFrontendLocation } from "../../../common/scripts/urls";
import MoreButton from "./MoreButton";
import { categoryIcons } from "../../../models/models";
import { CategoryIconFromString } from "./CategoryIconFromString";
import { getScrollPosition } from "../../../common/scripts/dom";
import { useState } from "react";

function ItemCard(props: any) {
    return (
    <div id={props.item_id} className=' w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-96 overflow-hidden p-8'>
        <div className='h-full border rounded border-slate-500 flex flex-col items-center justify-center'>
            <div onClick={() => {
                window.location.href = `${getFrontendLocation()}/item/${props.item_id}/`
            }} className="h-full w-11/12 mt-4 overflow-hidden flex justify-center align-center cursor-pointer">
                <img className='object-cover' alt="" src={props.image}></img>
            </div>
            <div className="flex flex-col justify-between w-full">
                {props.old_price? <div className=" ml-5 text-sm text-opacity-70 line-through translate-y-2">{`₹${props.old_price}`}</div>: null }
                <div className='ml-5 mt-2 text-lg font-bold'>{`₹${props.price_rs}`}</div>
                <div className='ml-5 text-xl '>{props.item_name}</div>
                <div className='ml-5 text-sm'>{`${props.description.substring(0, 20)}...`}</div>
                <div className=' flex items-center mb-4 ml-4 mt-2'>
                    <button className='subtractButton flex justify-center items-center bg-red-600 text-slate-100 dark:bg-red-300 dark:text-slate-800 rounded-full w-8 h-8' value={props.item_id} onClick={(e) => {changeCount(e, props.noOfItems, props.setNoOfItems);props.setShowCart(true);}}>
                        <FontAwesomeIcon icon={icon({name: 'minus', style: 'solid'})} />
                    </button>
                    <div className='px-2'>{props.thisCount}</div>
                    <button className='addButton flex justify-center items-center bg-green-600 text-slate-100 dark:bg-green-300 dark:text-slate-800 rounded-full w-8 h-8' value={props.item_id} onClick={(e) => {changeCount(e, props.noOfItems, props.setNoOfItems);props.setShowCart(true);}}>
                        <FontAwesomeIcon icon={icon({name: 'plus', style: 'solid'})} />
                    </button>

                </div>
            </div>
        </div>
    </div>
    )
}


export default function ItemCards(props: any) {
    const listOfItems: Array<any> = props.listOfItems;
    const countMap: Map<string, number> = props.noOfItems;
    const [getMoreVis, setMoreVis] = useState(false);
    window.addEventListener('scroll', (e) => {
        const scrollPercent = getScrollPosition();
        if (scrollPercent.relative > 0.9) {
            setMoreVis(true);
        }
    })
    return (
        <div className='flex flex-col md:pt-7 pt-20 items-center bg-slate-100 dark:bg-slate-800
        h-screen w-full text-slate-800 dark:text-slate-100'>
            <div className='my-4 text-md md:text-xl font-bold flex items-center'>
                <FontAwesomeIcon icon={icon({name: 'fire', style: 'solid'})} />
                <div className="ml-4">Trending</div>
            </div>
            <div className='flex justify-center items-center flex-wrap bg-slate-100 dark:bg-slate-800 pb-14 '>
                <div className="w-full py-4 flex justify-center">
                    <div className="flex gap-4 justify-center">
                    {Array.from(categoryIcons()).map((el) => {
                        // console.log(props.category, el)
                        return(
                            <div>
                                < CategoryIconFromString icon={el[1]} text={el[0]} category={props.category} setCategory={props.setCategory} setListOfItems={props.setListOfItems} setPage={props.setPage} setNoOfItems={props.setNoOfItems} setExploreEnd={props.setExploreEnd} setMoreVis={setMoreVis} />
                            </div>
                        );
                    })}
                    </div>
                </div>
            {listOfItems.map(el => {
                // map each object into component
                const thisId: string = el.item_id ? el.item_id.toString(): `${el.item_name}///${el.date_added}`;
                var thisCount = countMap.get(thisId);
                thisCount = thisCount !== undefined ? thisCount : 0;
                return <ItemCard {...{...el, "thisCount": thisCount, "key": thisId, noOfItems: props.noOfItems, setNoOfItems: props.setNoOfItems, showCart: props.showCart, setShowCart: props.setShowCart}} />
            })}
            </div>
            <MoreButton {...{
                    listOfItems: listOfItems,
                    noOfItems: props.noOfItems,
                    snackBarMessage: props.snackBarMessage,
                    isLoading: props.isLoading,
                    setNoOfItems: props.setNoOfItems,
                    setIsLoading: props.setIsLoading,
                    setSnackBarMessage: props.setSnackBarMessage,
                    setLoggedIN: props.setLoggedIN,
                    jwtToken: props.jwtToken,
                    setListOfItems: props.setListOfItems,
                    page: props.page,
                    setPage: props.setPage,
                    category: props.category,
                    exploreEnd: props.exploreEnd,
                    setExploreEnd: props.setExploreEnd,
                    getMoreVis: getMoreVis,
                    setMoreVis: setMoreVis,
}} />
            <ShoppingCart {...{"cart": props.noOfItems, setNoOfItems: props.setNoOfItems, "jwtToken": props.jwtToken, "setSnackBarMessage": props.setSnackBarMessage, "setIsLoading": props.setIsLoading, listOfItems: props.listOfItems, setListOfItems: props.setListOfItems, showCart: props.showCart, setShowCart: props.setShowCart}} />

            <Snacc {...{"message": props.snackBarMessage}} />
            <Loading {...{"isLoading": props.isLoading}} />
        </div>
    )
}

