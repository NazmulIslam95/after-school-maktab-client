import { useTranslation } from "react-i18next";

const TitleSec = ({ subTitle, title }) => {
  const { t, i18n } = useTranslation();

  // Dynamically choose font class
  const fontClass =
    i18n.language === "BN" ? "hind-siliguri-medium" : "philosopher-bold";

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <img
        src="https://i.ibb.co/twsWp4Fd/logo-nameless.png"
        alt="Logo"
        className="w-12 md:w-16"
      />

      <p
        className={`text-[#6a6a6a] text-xs md:text-lg font-medium ${fontClass}`}
      >
        {t(subTitle) || subTitle}
      </p>

      <h1
        className={`text-[#6a6a6a] text-xl md:text-4xl font-bold capitalize ${fontClass}`}
      >
        {t(title) || title}
      </h1>
    </div>
  );
};

export default TitleSec;
