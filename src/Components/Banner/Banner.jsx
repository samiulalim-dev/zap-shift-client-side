import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from "../..//assets/banner/banner1.png";
import slider2 from "../../assets/banner/banner2.png";
import slider3 from "../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <div className=" w-11/12 mx-auto my-9">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        interval={3000}
        swipeable={false}
        emulateTouch={false}
        stopOnHover={false}
      >
        <div>
          <img src={slider1} alt="" />
          <p className=" legend">Legend</p>
        </div>
        <div>
          <img src={slider2} alt="" />
          <p className=" legend">Legend</p>
        </div>
        <div>
          <img src={slider3} alt="" />
          <p className="legend">Legend</p>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
