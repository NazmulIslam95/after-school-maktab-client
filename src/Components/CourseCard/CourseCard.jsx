import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-colors duration-300 border border-transparent hover:border hover:border-[#0d3e93]">
      <img
        src={course.image}
        alt={course.name.bn}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-4">{course.name.bn}</h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 h-12">
          {course.description.bn}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Tutor:</span> {course.tutor}
        </p>
        {/* <p className="text-sm text-gray-700 mt-1">
          <span className="font-medium">Type:</span>{" "}
          {course.type === "1-to-1" ? "1-on-1" : course.type}
        </p> */}
        <Link to={`/course/${course._id}`}>
          <button className="my-4 w-full bg-[#0d3e93] text-white px-6 py-2 rounded-md font-semibold transition-colors duration-300 ease-in-out border border-transparent hover:bg-white hover:text-[#0d3e93] hover:border-[#0d3e93]">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
