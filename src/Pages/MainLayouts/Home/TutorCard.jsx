import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const TeacherCard = ({ teacher }) => {
  return (
    <div className="group w-full max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative">
      {/* Image */}
      <div className="flex justify-center mt-4">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md"
        />
      </div>

      {/* Info Box */}
      <div className="relative mt-4 px-6 pb-6 pt-3">
        {/* Static Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {teacher.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {teacher.expertise.join(", ")}
          </p>
        </div>

        {/* Slide-up Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-full bg-white px-6 pt-6 pb-4 flex flex-col items-center justify-center gap-3 rounded-b-xl transition-all duration-500 transform translate-y-full group-hover:translate-y-0 z-10">
          {/* <p className="text-center text-gray-600 text-sm">
            {teacher.description}
          </p> */}
          <div className="flex gap-3 mt-2">
            {teacher.social.facebook && (
              <Link to={teacher.social.facebook} target="_blank">
                <FaFacebookF className="text-blue-600 hover:text-blue-800 transition" />
              </Link>
            )}
            {teacher.social.twitter && (
              <Link to={teacher.social.twitter} target="_blank">
                <FaTwitter className="text-blue-400 hover:text-blue-600 transition" />
              </Link>
            )}
            {teacher.social.linkedin && (
              <Link to={teacher.social.linkedin} target="_blank">
                <FaLinkedinIn className="text-blue-700 hover:text-blue-900 transition" />
              </Link>
            )}
            {teacher.social.youtube && (
              <Link to={teacher.social.youtube} target="_blank">
                <FaYoutube className="text-red-600 hover:text-red-800 transition" />
              </Link>
            )}
            {teacher.social.instagram && (
              <Link to={teacher.social.instagram} target="_blank">
                <FaInstagram className="text-pink-500 hover:text-pink-700 transition" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
