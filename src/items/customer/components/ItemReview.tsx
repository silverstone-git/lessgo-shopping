import { useEffect, useState } from "react";
import { isAlreadyOrdered, submitReview } from "../scripts/reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

function ReviewItem(props: any) {
    const [isAlreadyOrderedFlag, setIsAlreadyOrderedFlag] = useState(false);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(3);

    async function setupReviewItem(jwtToken: string, itemId: number) {
        // check if user has already ordered the item
        const tempIsAlreadyOrderedFlag = await isAlreadyOrdered(jwtToken, itemId, props.setIsLoading);
        setIsAlreadyOrderedFlag(tempIsAlreadyOrderedFlag);
    }
    useEffect(() => {
        setupReviewItem(props.auth, props.itemId);
        // eslint-disable-next-line
    }, [props.auth, props.itemId])

    if(props.auth && isAlreadyOrderedFlag) {
        return(
            <div>
                <div className="font-bold text-md">Review your ordered Item:</div>
                <form action="" onSubmit={(e) => {
                    e.preventDefault();
                    (e.target as HTMLFormElement).reset();
                    submitReview(rating, review, props.auth, props.itemId, props.setSnackBarMessage, props.setIsLoading);
                }} className="flex flex-col mt-4">
                <label htmlFor="rating-input">Rating (out of 10)</label>
                <input required type="number" className="item-master-input mt-3" name="rating-input" id="rating-input" min={0} max={5} onChange={(e) => setRating(Number(e.target.value))}/>
                <label htmlFor="review-input" className="mt-6">Review</label>
                <textarea required onChange={(e) => setReview(e.target.value)} id="review-input" className=" item-master-input h-36 mt-3" maxLength={3000} minLength={10} />
                <div className="flex justify-end">
                    <button className="rounded-full p-4 flex items-center gap-2 mt-4 bg-green-500 text-slate-100 dark:bg-green-300 dark:text-slate-800"
                    type="submit"
                    >
                        <FontAwesomeIcon icon={icon({name: 'check', style: 'solid'})} />
                        <div>Submit</div>
                    </button>
                </div>
                </form>
            </div>
        )
    } else {
        return null;
    }
}
export default ReviewItem;