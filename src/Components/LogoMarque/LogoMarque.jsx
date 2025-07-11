import Marquee from "react-fast-marquee";
import amazon from "../../assets/brands/amazon.png";
import casio from "../../assets/brands/casio.png";
import amazon_vector from "../../assets/brands/amazon_vector.png";
import moonstar from "../../assets/brands/moonstar.png";
import randstad from "../../assets/brands/randstad.png";
import start_people_1 from "../../assets/brands/start-people 1.png";
import start from "../../assets/brands/start.png";

const LogoMarquee = () => {
  const logos = [
    amazon,
    casio,
    amazon_vector,
    moonstar,
    randstad,
    start_people_1,
    start,
  ];

  return (
    <section className="my-10 py-10">
      <div className="max-w-6xl mx-auto px-4 text-center mb-4">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-700">
          We've helped thousands of sales teams
        </h2>
      </div>

      <div>
        <Marquee speed={50} gradient={false} pauseOnHover={true}>
          {logos.map((logo, index) => (
            <div key={index} className=" flex items-center mr-15">
              <img
                src={logo}
                alt={`Logo ${index + 1}`}
                className=" mx-8  transition"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default LogoMarquee;
