import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getFrontendLocation } from "../scripts/urls";

function CarouselDashboard(props: any) {

    return (
        <Carousel interval={3000} autoPlay={true} infiniteLoop={true} showThumbs={props.showThumbs !== undefined ? props.showThumbs : false} showStatus={props.showStatus !== undefined ? props.showStatus : true } showIndicators className='w-full' >
            {props.listOfImages.map((el: any) => {
                return(
                <div key={el[2]} className={`h-[${props.height ? props.height : 60}vh]  w-full cursor-pointer flex justify-center items-center`} onClick={() => {
                    window.location.href = `${getFrontendLocation()}/item/${el[2]}/`
                }}>
                    <img src={el[0]} alt="" className=" object-contain h-full" />
                    {el[1] ? <p className="legend">{el[1]}</p> : null}
                </div>
                )
            }
            )}
        </Carousel>
    )
}

export default CarouselDashboard;
