import React from "react";
import Banner from "../../Components/Banner/Banner";
import OurServices from "../../Components/OurServices/OurServices";
import HowItWorks from "../../Components/HowItWorks/HowItWorks";
import LogoMarquee from "../../Components/LogoMarque/LogoMarque";
import FeatureCards from "../../Components/FeatureSection/FeatureSection";
import Merchant from "../../Components/Merchant/Merchant";
import TestimonialCarousel from "../../Components/TestimonialCarousel/TestimonialCarousel";
import FrequentlyAsked from "../../Components/FrequentlyAsked/FrequentlyAsked";
const Home = () => {
  return (
    <div>
      {/* banner */}
      <div>
        <Banner></Banner>
      </div>
      {/* How it works*/}
      <div>
        <HowItWorks></HowItWorks>
      </div>
      {/* Our services */}
      <div data-aos="fade-right">
        <OurServices></OurServices>
      </div>
      {/* logo marque */}
      <div>
        <LogoMarquee></LogoMarquee>
      </div>
      {/* Feature section */}
      <div>
        <FeatureCards></FeatureCards>
      </div>
      {/* merchant */}
      <div>
        <Merchant></Merchant>
      </div>
      {/* testimonialCarousel */}
      <div>
        <TestimonialCarousel></TestimonialCarousel>
      </div>
      {/* FAQ Section  */}
      <div>
        <FrequentlyAsked></FrequentlyAsked>
      </div>
    </div>
  );
};

export default Home;
