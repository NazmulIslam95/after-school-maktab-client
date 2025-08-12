/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";
import Swal from "sweetalert2";

const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: { en: "", bn: "" },
    description: { en: "", bn: "" },
    image: "",
    type: "batch",
    featured: false,
    categories: "",
    priceType: "batch",
    price: {
      "30min": { "3days": "", "4days": "", "5days": "", "6days": "" },
      "60min": { "3days": "", "4days": "", "5days": "", "6days": "" },
    },
    batchPrice: "",
  });

  useEffect(() => {
    axiosSecure.get(`/courses/${id}`).then((res) => {
      const data = res.data;
      setCourse(data);
      setFormData({
        name: {
          en: data.name?.en || "",
          bn: data.name?.bn || "",
        },
        description: {
          en: data.description?.en || "",
          bn: data.description?.bn || "",
        },
        image: data.image || "",
        type: data.type || "batch",
        featured: data.featured || false,
        categories: data.categories?.join(", ") || "",
        priceType: typeof data.price === "number" ? "batch" : "1-to-1",
        price:
          typeof data.price === "number"
            ? {
                "30min": { "3days": "", "4days": "", "5days": "", "6days": "" },
                "60min": { "3days": "", "4days": "", "5days": "", "6days": "" },
              }
            : data.price,
        batchPrice: typeof data.price === "number" ? data.price : "",
      });
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNestedChange = (parent, lang, value) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [lang]: value,
      },
    }));
  };

  const handlePriceChange = (duration, day, value) => {
    setFormData((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [duration]: {
          ...prev.price[duration],
          [day]: Number(value),
        },
      },
    }));
  };

  const handleCourseUpdate = async (e) => {
    e.preventDefault();

    const updatedCourse = {
      name: formData.name,
      description: formData.description,
      image: formData.image,
      tutor: formData.tutor,
      type: formData.type,
      featured: formData.featured,
      categories: formData.categories.split(",").map((c) => c.trim()),
      price:
        formData.priceType === "batch"
          ? Number(formData.batchPrice)
          : formData.price,
    };

    try {
      await axiosSecure.patch(`/courses/${id}`, updatedCourse);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Course Updated Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/courses");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "info",
        title: "No Changes",
        text: "No Changes Were Made to the Course.",
      });
    }
  };

  if (!course) return <p className="p-4 text-gray-500">Loading...</p>;

  return (
    <div>
      <DashboardBanner title="Edit Course" subTitle="Update Course Info" />

      <form
        onSubmit={handleCourseUpdate}
        className="max-w-3xl mx-auto bg-white p-6 shadow-md mt-6 rounded space-y-4"
      >
        {/* English and Bangla Name */}
        <div>
          <label className="block font-medium">Course Name (English)</label>
          <input
            type="text"
            className="w-full input input-bordered"
            value={formData.name.en}
            onChange={(e) => handleNestedChange("name", "en", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Course Name (Bangla)</label>
          <input
            type="text"
            className="w-full input input-bordered"
            value={formData.name.bn}
            onChange={(e) => handleNestedChange("name", "bn", e.target.value)}
          />
        </div>

        {/* English and Bangla Description */}
        <div>
          <label className="block font-medium">Description (English)</label>
          <textarea
            className="w-full textarea textarea-bordered"
            value={formData.description.en}
            onChange={(e) =>
              handleNestedChange("description", "en", e.target.value)
            }
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description (Bangla)</label>
          <textarea
            className="w-full textarea textarea-bordered"
            value={formData.description.bn}
            onChange={(e) =>
              handleNestedChange("description", "bn", e.target.value)
            }
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            className="w-full input input-bordered"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        {/* Type + Featured */}
        <div className="flex items-center gap-4">
          <label className="block font-medium">Type:</label>
          <select
            name="type"
            className="select select-bordered"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="batch">Batch</option>
            <option value="1-to-1">1-to-1</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured
          </label>
        </div>

        {/* Categories */}
        <div>
          <label className="block font-medium">
            Categories (comma separated)
          </label>
          <input
            type="text"
            name="categories"
            className="w-full input input-bordered"
            value={formData.categories}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price Type */}
        <div>
          <label className="block font-medium">Price Type</label>
          <select
            name="priceType"
            className="select select-bordered"
            value={formData.priceType}
            onChange={handleChange}
          >
            <option value="batch">Batch</option>
            <option value="1-to-1">1-to-1</option>
          </select>
        </div>

        {/* Batch or 1-to-1 Pricing */}
        {formData.priceType === "batch" ? (
          <div>
            <label className="block font-medium">Batch Price (TK)</label>
            <input
              type="number"
              name="batchPrice"
              className="w-full input input-bordered"
              value={formData.batchPrice}
              onChange={handleChange}
            />
          </div>
        ) : (
          <>
            {["30min", "60min"].map((duration) => (
              <div key={duration}>
                <h3 className="font-semibold mt-4">{duration}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {["3days", "4days", "5days", "6days"].map((day) => (
                    <div key={day}>
                      <label className="block text-sm">{day} Price (TK)</label>
                      <input
                        type="number"
                        className="w-full input input-bordered"
                        value={formData.price[duration][day]}
                        onChange={(e) =>
                          handlePriceChange(duration, day, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-green-600 w-full hover:bg-green-700 text-white"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
