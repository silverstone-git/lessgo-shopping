import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getFrontendLocation } from "../scripts/urls";

function CarouselDashboard(props: any) {

    return (
        <Carousel className="md:w-2/3 w-full" >
            {props.listOfImages.map((el: any) => {
                return(
                <div key={el[2]} className="h-[60vh] w-full cursor-pointer" onClick={() => {
                    window.location.href = `${getFrontendLocation}/item/${el[2]}`
                }}>
                    <img src={el[0]} alt="Recently viewed items" />
                    <p className="legend">{el[1]}</p>
                </div>
                )
            }
            )}
        </Carousel>
    )
}

export default CarouselDashboard;
