import { useEffect, useState } from "react";
import { isAlreadyOrdered } from "../scripts/reviews";

function ReviewItem(props: any) {
    const [isAlreadyOrderedFlag, setIsAlreadyOrderedFlag] = useState(false);
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
            <div>Review your ordered Item:</div>
        )
    } else {
        return null;
    }
}
export default ReviewItem;