import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Banner = ({ title, subTitle }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="relative h-60 md:h-80 w-full overflow-hidden philosopher-regular">
      {/* Background Image */}
      <img
        src="https://naudummy.com/darsgah/wp-content/uploads/2024/04/footer-img.jpg"
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-85" />

      {/* Banner Content */}
      <div
        className={`absolute inset-0 z-10 mt-32 flex flex-col items-center justify-center px-4 text-white ${
          i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-bold"
        }`}
      >
        <h1 className="text-md md:text-5xl mb-4 text-center">{t(title)}</h1>
        <p className="text-xs md:text-base">
          <Link className="hover:text-green-800" to="/">
            {t("home")}
          </Link>
          <span className="text-green-800">
            {" > "} {t(subTitle)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Banner;
