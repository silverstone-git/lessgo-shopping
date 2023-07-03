export function ItemPageVideo(props: any) {
    if(props.video === 'data:' || props.video === 'data:application/octet-stream;base64,' || !props.video || props.video.length < 100) {
        //
        return null;
    } else {
        return(
            <div className="flex flex-col gap-4">
                <div>Seller's Showcase</div>
                <div className="w-36 h-36 flex justify-center items-center overflow-hidden border border-green-500">
                    <video src={props.video}></video>
                </div>
            </div>
        );
    }
}