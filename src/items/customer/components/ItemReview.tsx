function ReviewItem(props: any) {
    if(props.auth) {
        return(
            <div>Add a Review</div>
        )
    } else {
        return(

            <div>Sign in to add a Review</div>
        );
    }
}
export default ReviewItem;