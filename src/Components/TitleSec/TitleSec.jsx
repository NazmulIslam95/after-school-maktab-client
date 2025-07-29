const TitleSec = ({subTitle, title}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
      <img
        src="https://i.ibb.co/twsWp4Fd/logo-nameless.png"
        alt="Logo"
        className="w-16"
      />
      <p className="text-[#6a6a6a] text-base md:text-lg font-medium font-serif">
        {subTitle}
      </p>
      <h1 className="text-[#6a6a6a] text-3xl md:text-4xl font-bold font-serif capitalize">
        {title}
      </h1>
    </div>
  );
};

export default TitleSec;
