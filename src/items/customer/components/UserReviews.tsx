import { icon } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function UserReviews(props: any) {
    return(
        props.reviews.map((el: any) => {
        return (
        <div className="flex flex-col items-start bg-opacity-30 bg-slate-400 rounded-md w-full my-8 pt-4 pb-2 px-4">
            <div className="flex gap-4">
                <div id={`username-${el.review_id}`} className="font-bold text-sm">{el.user_name}</div>

                {'*'.repeat(el.rating).split('').map((star) => {return(
                <div className="flex">
                    <FontAwesomeIcon icon={icon({name: 'star', style: 'solid'})} />
                </div>
                )})}
            </div>
            <div id={`content-${el.review_id}`} className="text-md mt-4">{el.content}</div>
            <div id={`date-${el.review_id}`} className=" self-end text-gray-100 text-sm ">{el.date_added}</div>

        </div>)}
        )
    )
}