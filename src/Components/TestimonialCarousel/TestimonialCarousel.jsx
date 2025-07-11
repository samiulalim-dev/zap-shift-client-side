// src/components/TestimonialCarousel.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import customer_top from "../../assets/images/customer-top.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Samiul Alim",
    title: "MERN stack developer",
    message:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Rasel Ahamed",
    title: "CTO",
    message:
      "Posture improvement devices help reduce strain and increase comfort, allowing better focus and productivity.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Nasir Uddin",
    title: "CEO",
    message:
      "Daily use ensures lasting posture correction and positive impact on your spine health and confidence.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Hossain ali",
    title: "PEO",
    message:
      "Daily use ensures lasting posture correction and positive impact on your spine health and confidence.",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

const TestimonialCarousel = () => {
  return (
    <section data-aos="zoom-in-up" className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <div className=" flex flex-col items-center justify-center">
          <div className=" mb-10">
            <img src={customer_top} alt="" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 ">
              What our customers are sayings
            </h2>
            <p className=" my-5 text-gray-500">
              Enhance posture, mobility, and well-being effortlessly with
              Posture Pro. Achieve proper alignment, reduce <br /> pain, and
              strengthen your body with ease!
            </p>
          </div>
        </div>

        {/* Navigation buttons container */}
        <div className="relative">
          <Swiper
            slidesPerView={1.2}
            spaceBetween={20}
            loop={true}
            centeredSlides={true}
            pagination={{ el: ".custom-pagination", clickable: true }}
            navigation={{
              nextEl: ".swiper-next",
              prevEl: ".swiper-prev",
            }}
            modules={[Pagination, Navigation]}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-xl shadow-lg h-full transition-all hover:shadow-xl">
                  <p className="text-gray-600 text-sm mb-6">“{item.message}”</p>
                  <div className="  border-t-2 border-gray-400 border-dashed my-6"></div>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-xs">{item.title}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom arrows and pagination center-aligned under slider */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button className="swiper-prev p-2 cursor-pointer rounded-full hover:bg-lime-400 bg-white shadow-md  transition">
              <FaArrowLeft className="text-gray-600" />
            </button>

            {/* Pagination dots will render here */}
            <div className="custom-pagination "></div>

            <button className="swiper-next p-2 cursor-pointer bg-white shadow-md rounded-full  hover:bg-lime-400 transition">
              <FaArrowRight className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
