import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CarouselDashboard from "../../common/components/Carousel";
import Snacc from "../../common/components/SnackBarComponent";
import Loading from "../../common/components/Loading";
import OffersWrap from "./OffersWrap";

export default function DashboardCustomer(props: any) {
    return (
    <div id='dashboard'>

      <div className='flex flex-col items-center pt-24 md:pt-0 bg-slate-100 dark:bg-slate-800 h-screen w-full text-slate-800 dark:text-slate-100'>
        <div className="hidden md:flex">
        <CarouselDashboard {...{"listOfImages": [
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/a1d93b6bc446790d.jpg?q=20", "", 1],
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/55b781eb99b78196.jpg?q=20", "", 2],
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/1f3efd09669a5bc2.jpg?q=20", "", 3],
          ["https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/50a78433b9c07bdd.jpg?q=20", "", 4],
        ], height: 30}} /></div>
        <div className="md:hidden inline mt-14 pb-4">
        <p className="font-logo text-4xl">Lessgo</p>
        </div>
        <div className=" bg-slate-100 dark:bg-slate-800 pb-14 w-full flex flex-col items-center justify-center">
          <div className="flex items-center mt-8 mb-16 gap-4">
            <div className=" text-sm sm:text-md md:text-xl">
            {props.newUser ? 'Trending Items': 'Continue where you left off' }
            </div>
            <FontAwesomeIcon icon={icon({name: 'arrow-right', style: 'solid'})} />
          </div>
          <CarouselDashboard {...{"listOfImages": props.carouselArray, height: 50}} />
        </div>
        <OffersWrap {...{
          electronicsCarousel: props.electronicsCarousel,
          pkdCarousel: props.pkdCarousel,
          vehiclesCarousel: props.vehiclesCarousel,
          materialCarousel: props.materialCarousel,
          laptopCarousel: props.laptopCarousel,
          groceryCarousel: props.groceryCarousel,
        }} />
      </div>

      <Snacc {...{"message": props.snackBarMessage}} />
      <Loading {...{"isLoading": props.isLoading}} />
    </div>
    )
}