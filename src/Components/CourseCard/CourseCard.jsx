const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-all  hover:border hover:border-[#0d3e93]">
      <img
        src={course.image}
        alt={course.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 h-12">{course.name}</h2>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3 h-12">
          {course.description}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-medium">Tutor:</span> {course.tutor}
        </p>
        {/* <p className="text-sm text-gray-700 mt-1">
          <span className="font-medium">Type:</span>{" "}
          {course.type === "1-to-1" ? "1-on-1" : course.type}
        </p> */}
        <button className="my-4 w-full px-6 py-2 rounded-md font-semibold transition bg-[#0d3e93] text-white hover:bg-white hover:text-[#0d3e93] hover:border-2 border-transparent">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
