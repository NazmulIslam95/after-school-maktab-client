import { useLoaderData } from "react-router-dom";
import Navbar from "../../../Components/Navbar/Navbar";
import Banner from "../../../Components/Banner/Banner";

const TutorDetails = () => {
  const tutor = useLoaderData();

  // Function to render new lines in the details text
  const renderDetails = (text) => {
    return text.split("\n").map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Banner title={tutor.name} subTitle="Tutor Details" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Tutor Image Section */}
            <div className="md:w-1/3 p-6 flex flex-col items-center">
              <img
                src={tutor.image}
                alt={tutor.name}
                className="w-64 h-64 object-cover rounded-full border-4 border-blue-100 shadow-lg"
              />

              <div className="mt-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full inline-block shadow-md">
                  <span className="text-xl font-bold">{tutor.experience}</span>{" "}
                  {tutor.experience === "1" ? "Year" : "Years"} Experience
                </div>
              </div>
            </div>

            {/* Tutor Details Section */}
            <div className="md:w-2/3 p-6 border-t md:border-t-0 md:border-l border-gray-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  About {tutor.name}
                </h2>
                <p className="text-blue-600 font-medium">{tutor.education}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Qualifications
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  {renderDetails(tutor.details)}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Teaching Approach
                </h3>
                <p className="text-gray-700">
                  {tutor.name} combines traditional Islamic teaching methods
                  with modern educational techniques to provide a comprehensive
                  learning experience for students of all ages.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
