import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CarouselDashboard(props: any) {

    return (
        <Carousel className="md:w-2/3 w-full" >
            {props.listOfImages.map((el: any) => {
                return(
                <div className="h-[60vh] w-full" onClick={() => {
                    let goTo: string | undefined;
                    if(window.location.href.search('localhost') === -1) {
                    goTo = process.env.REACT_APP_LOCAL_SERVER;
                    } else {
                    goTo = process.env.REACT_APP_CUR_SERVER;
                    }
                    window.location.href = `${goTo}:3005/item/${el[2]}`
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
