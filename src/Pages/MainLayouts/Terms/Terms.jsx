import Banner from "../../../Components/Banner/Banner";
import Navbar from "../../../Components/Navbar/Navbar";

const Terms = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <Banner title="Terms & Policy" subTitle="Our Terms & Policy" />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8 mb-12 hind-siliguri-regular">
        {/* Scholarship Section */}
        <section className="mb-10">
          <div className="flex items-center mb-6">
            <span className="text-3xl mr-3">🎓</span>
            <h2 className="text-2xl font-bold text-green-700">
              ভর্তির ক্ষেত্রে স্কলারশিপ সুবিধা
            </h2>
          </div>

          <p className="text-gray-700 mb-6 leading-relaxed">
            আমাদের প্রতিষ্ঠান শিক্ষার্থীদের পারিবারিক আর্থিক স্বচ্ছলতা ও
            পারস্পরিক সামাজিক সংযোগ বৃদ্ধির লক্ষ্যে বিশেষ স্কলারশিপ ব্যবস্থা
            চালু করেছে। এর মাধ্যমে দাওয়াহ্‌র আলো পরিবারে, বন্ধুমহলে এবং সমাজে
            ছড়িয়ে পড়বে, ইনশাআল্লাহ।
          </p>

          <h3 className="text-xl font-semibold text-green-600 mb-4 mt-8">
            স্কলারশিপের ধরনসমূহ
          </h3>

          <div className="bg-green-50 p-5 rounded-lg mb-6">
            <h4 className="text-lg font-medium text-green-700 mb-2">
              1. Waiver – 20% ছাড়
            </h4>
            <p className="text-gray-700 mb-4">
              একই পরিবারের একাধিক সদস্য ভর্তি হলে, প্রতিটি অতিরিক্ত শিক্ষার্থী
              তার মাসিক বেতনে 20% ছাড় উপভোগ করবে। এ সুবিধা নিয়মিত মাসিক ফি-এর
              ক্ষেত্রে প্রযোজ্য।
            </p>

            <h4 className="text-lg font-medium text-green-700 mb-2">
              2. Referral Waiver – 15% ছাড় (উভয়ের জন্য)
            </h4>
            <p className="text-gray-700">
              আপনার পরিচয়ে কোনো নতুন শিক্ষার্থী ভর্তি হলে, আপনি এবং নতুন
              শিক্ষার্থী উভয়েই মাসিক বেতনে 15% ছাড় পাবেন। এ সুবিধা ভর্তি
              প্রক্রিয়া সম্পন্ন হওয়ার পরবর্তী মাস থেকে কার্যকর হবে।
            </p>
          </div>

          <h3 className="text-xl font-semibold text-green-600 mb-4">
            📌 শর্তাবলি
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>সকল ছাড় কেবল নিয়মিত মাসিক বেতনের ক্ষেত্রে প্রযোজ্য।</li>
            <li>
              একই পরিবারের সদস্য যতজন ভর্তি হোন না কেন—ভাই-বোন, মা-বাবা কিংবা
              স্বামী-স্ত্রী—সকলেই এই সুবিধার আওতায় আসবেন।
            </li>
            <li>
              Referral Waiver স্কলারশিপেও যতজন রেফারেন্সের মাধ্যমে ভর্তি হবে,
              প্রত্যেকেই উক্ত ছাড়ের অন্তর্ভুক্ত হবে।
            </li>
            <li>
              ছাড় প্রাপ্তির জন্য প্রয়োজনীয় প্রমাণপত্র ও তথ্যাদি প্রদান করা
              বাধ্যতামূলক।
            </li>
          </ul>
        </section>

        <div className="border-t border-gray-300 my-8"></div>

        {/* Terms and Conditions Section */}
        <section>
          <h3 className="text-xl font-semibold text-green-700 mb-4">
            ক্লাস সংক্রান্ত নির্দেশিকা
          </h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-3">
            <li>শিক্ষার্থীদের অবশ্যই যথাসময়ে ক্লাসে উপস্থিত হতে হবে।</li>
            <li>
              ক্লাস শুরু হওয়ার 10 মিনিট পর আর প্রবেশ করা যাবে না এবং সেই ক্লাস
              আর দেওয়া হবে না।
            </li>
            <li>
              কোনো কারণে ক্লাস করতে না পারলে অন্তত এক ঘণ্টা আগে জানাতে হবে।
              জানালে পরবর্তীতে সেই ক্লাস পুনরায় নেওয়া হবে।
            </li>
            <li>
              শিক্ষক উপস্থিত না হলে অথবা প্রাতিষ্ঠানিক কোন কারণে ক্লাস অনুষ্ঠিত
              না হলে, পরবর্তীতে সেই ক্লাস নেওয়া হবে।
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Terms;
