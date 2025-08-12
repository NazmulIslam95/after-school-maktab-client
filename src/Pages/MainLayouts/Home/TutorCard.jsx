import {
  Link,
  // useNavigate
} from "react-router-dom";

const TeacherCard = ({ tutor }) => {
  // const navigate = useNavigate();

  // const handleCardClick = () => {
  //   navigate(`/tutorDetails/${tutor._id}`); // Adjust this path to match your route
  // };

  return (
    <Link to={`/tutor/${tutor._id}`}>
      <div
        // onClick={handleCardClick}
        className="group w-full max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative cursor-pointer"
      >
        {/* Experience Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-br from-blue-500 to-blue-900 text-white flex items-center justify-center h-20 w-20 rounded-full shadow-lg z-10 p-2">
          <p className="text-center text-xs leading-tight">
            <span className="text-md font-bold block">{tutor?.experience}</span>
            {tutor?.experience === "1" ? "Year" : "Years"} Experience
          </p>
        </div>

        {/* Image */}
        <div className="flex justify-center mt-4">
          <img
            src={tutor?.image}
            alt={tutor?.name}
            className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-md group-hover:border-blue-200 transition-all"
          />
        </div>

        {/* Info Box */}
        <div className="relative mt-4 px-6 pb-6 pt-3">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
              {tutor?.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1 group-hover:text-blue-500 transition-colors">
              {tutor?.education}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TeacherCard;
