const ChooseUs = () => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between px-10 py-12 gap-8 ">
      {/* Left Column */}
      <div className=" ">
        <p className="text-xs tracking-wider text-[#555] uppercase mb-4">
          Experienced Islamic Teachers
        </p>
        <h1 className="text-xl md:text-5xl font-bold leading-tight text-[#1a1a1a] mb-6">
          Why Choose Our
          <br />
          Islamic{" "}
          <span className="border-b-[3px] border-[#f7b800]">Institute</span>
        </h1>
        <p className="text-[#6c6c6c] text-sm mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore.
        </p>
        <div className="flex gap-14">
          {/* Stat 1 */}
          <div className="flex flex-col items-start">
            <div className="flex gap-3 mb-1">
              {/* <i className="fas fa-tree text-2xl text-[#1a1a1a]"></i> */}
              <span className="text-xl md:text-5xl font-semibold text-[#1a1a1a]">150</span>
            </div>
            <div className="h-[3px] bg-[#f7b800] w-full mb-2"></div>
            <p className="text-[#6c6c6c] text-sm leading-relaxed w-[120px] md:w-[230px]">
              Top 150 in the Times Higher Islamic Education (THE) World
              University Rankings.
            </p>
          </div>
          {/* Stat 2 */}
          <div className="flex flex-col items-start">
            <div className="flex gap-3 mb-1">
              <i className="fas fa-graduation-cap text-2xl text-[#1a1a1a]"></i>
              <span className="text-xl md:text-5xl font-semibold text-[#1a1a1a]">
                92<span className="text-sm md:text-3xl align-top">%</span>
              </span>
            </div>
            <div className="h-[3px] bg-[#f7b800] w-full mb-2"></div>
            <p className="text-[#6c6c6c] text-sm leading-relaxed w-[120px] md:w-[230px]">
              Top 150 in the Times Higher Islamic Education (THE) World
              University Rankings.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column (Cards) */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-0 md:mt-16">
        {/* Card 1 */}
        <div className="bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center  text-left">
          <h3 className="font-semibold text-lg text-[#1a1a1a] mb-1">
            Online Academics Programs
          </h3>
          <p className="text-sm text-[#4d4d4d]">
            We think before we deliver. We bespoke as standard. Lorem ipsum
            dolor sit...
          </p>
        </div>

        {/* Repeat for Card 2, 3, 4 */}
        <div className="bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center  text-left">
          <h3 className="font-semibold text-lg text-[#1a1a1a] mb-1">
            Learn Islamic Books
          </h3>
          <p className="text-sm text-[#4d4d4d]">
            We think before we deliver. We bespoke as standard. Lorem ipsum
            dolor sit...
          </p>
        </div>

        <div className="bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center  text-left">
          <h3 className="font-semibold text-lg text-[#1a1a1a] mb-1">
            Online Quran Classes
          </h3>
          <p className="text-sm text-[#4d4d4d]">
            We think before we deliver. We bespoke as standard. Lorem ipsum
            dolor sit...
          </p>
        </div>

        <div className="bg-[url('https://naudummy.com/darsgah/wp-content/plugins/ingeniofy/assets/images/background-online.jpg')] bg-cover rounded-md shadow-xl p-8 flex flex-col justify-center  text-left">
          <h3 className="font-semibold text-lg text-[#1a1a1a] mb-1">
            We Value Our Students
          </h3>
          <p className="text-sm text-[#4d4d4d]">
            We think before we deliver. We bespoke as standard. Lorem ipsum
            dolor sit...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;
