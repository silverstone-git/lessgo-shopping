import { useEffect, useState } from "react";
import { isAlreadyOrdered } from "../scripts/reviews";

function ReviewItem(props: any) {
    const [isAlreadyOrderedFlag, setIsAlreadyOrderedFlag] = useState(false);
    async function setupReviewItem(jwtToken: string) {
        // check if user has already ordered the item
        const tempIsAlreadyOrderedFlag = await isAlreadyOrdered(jwtToken, props.setIsLoading);
        setIsAlreadyOrderedFlag(tempIsAlreadyOrderedFlag);
    }
    useEffect(() => {
        setupReviewItem(props.auth);
    }, [props.auth])

    if(props.auth && isAlreadyOrderedFlag) {
        return(
            <div>Add a Review</div>
        )
    } else {
        return null;
    }
}
export default ReviewItem;