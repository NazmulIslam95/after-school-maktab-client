import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

const ChooseUs = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-10 py-12 gap-8 hind-siliguri-medium">
      {/* Left Column */}
      <div className="w-full md:w-1/2 ">
        <h1 className="text-xl md:text-5xl font-bold leading-tight text-[#1a1a1a] mb-6">
          {t("chooseUs.title")}
        </h1>
        <p className="text-[#6c6c6c] text-sm mb-10">
          {t("chooseUs.description")}
        </p>
        <div className="flex gap-14">
          {/* Stat 1 */}
          <div className="flex flex-col items-start">
            <div className="flex gap-3 mb-1">
              <i className="fas fa-tree text-2xl text-[#1a1a1a]"></i>
              <span className="text-xl md:text-5xl font-semibold text-[#1a1a1a]">
                <CountUp duration={30} npm end={2200} />+{"  "}
                <span className="text-[#6c6c6c] text-xl ">
                  {t("chooseUs.statStudents")}
                </span>
              </span>
            </div>
            <div className="h-[3px] bg-[#082f72] w-full mb-2"></div>
            <p className=" leading-relaxed w-[100px] md:w-[230px]"></p>
          </div>
        </div>
      </div>

      {/* Right Column (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-0 md:mt-16 w-full md:w-3/5">
        {/* Card 1 */}
        <div className="relative bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center text-left overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-md md:text-lg text-[#1a1a1a] mb-1 group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.onlinePrograms.title")}
            </h3>
            <p className="text-xs text-[#4d4d4d] group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.onlinePrograms.description")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#082f72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center text-left overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-md text-[#1a1a1a] mb-1 group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.learnBooks.title")}
            </h3>
            <p className="text-xs text-[#4d4d4d] group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.learnBooks.description")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#082f72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center text-left overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-md text-[#1a1a1a] mb-1 group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.quranClasses.title")}
            </h3>
            <p className="text-xs text-[#4d4d4d] group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.quranClasses.description")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#082f72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

        {/* Card 4 */}
        <div className="relative bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center text-left overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-md text-[#1a1a1a] mb-1 group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.valueStudents.title")}
            </h3>
            <p className="text-xs text-[#4d4d4d] group-hover:text-white transition-colors duration-500">
              {t("chooseUs.cards.valueStudents.description")}
            </p>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#082f72] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
