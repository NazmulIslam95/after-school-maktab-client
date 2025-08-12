import { useEffect, useState } from "react";
import useAxiosPublic from "../../CustomHooks/useAxiosPublic";
import TitleSec from "../TitleSec/TitleSec";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axiosPublic.get("/testimonials");
        setTestimonials(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Failed to fetch testimonials:", err);
      }
    };

    fetchTestimonials();
  }, [axiosPublic]);

  if (loading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <TitleSec subTitle="testimonials.subTitle" title="testimonials.title" />
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2e3192]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <TitleSec subTitle="testimonials.subTitle" title="testimonials.title" />
        <div className="text-center text-red-500 py-10">
          {t("testimonials.error")}: {error}
        </div>
      </div>
    );
  }

  if (!testimonials.length) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <TitleSec subTitle="testimonials.subTitle" title="testimonials.title" />
        <div className="text-center text-gray-500 py-10">
          {t("testimonials.empty")}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 hind-siliguri-regular">
      <div className="max-w-7xl mx-auto">
        <TitleSec subTitle="testimonials.subTitle" title="testimonials.title" />

        <div className="mt-4">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className=" w-full md:w-1/2 mx-auto p-2 sm:p-4">
                  <div className="flex flex-col items-center space-y-4">
                    {testimonial.gender && (
                      <div className="text-xs text-gray-500 mt-1">
                        {testimonial.gender.toLowerCase() === "female" ? (
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjhPKN6RoQ0Aj4jNvz1FgHZIjNf6e7Jtb66K4g59fcpJayo84AGft3nftNvuonR4eZ35c&usqp=CAU"
                            alt="Female avatar"
                            className="w-20 h-20 sm:w-24 sm:h-24 mt-2 rounded-full object-cover border-4 border-white shadow-md"
                          />
                        ) : (
                          <img
                            src="https://img.freepik.com/premium-vector/man-traditional-muslim-clothing-arab-icon-islamic-person-avatar_53562-14231.jpg"
                            alt="Male avatar"
                            className="w-20 h-20 sm:w-24 sm:h-24 mt-2 rounded-full object-cover border-4 border-white shadow-md"
                          />
                        )}
                      </div>
                    )}
                    <blockquote className="text-sm sm:text-base text-center text-black px-2 sm:px-4">
                      "{testimonial.message}"
                    </blockquote>
                    <div className="text-center mt-auto">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {testimonial.address || t("testimonials.guest")}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
