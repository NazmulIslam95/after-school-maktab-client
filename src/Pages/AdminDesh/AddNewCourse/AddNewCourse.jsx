import { useState } from "react";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";

const AddNewCourse = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    tutor: "",
    type: "batch",
    featured: false,
    categories: [],
    price: "", // For batch, numeric; for 1-to-1, this gets replaced
  });

  const [categoriesInput, setCategoriesInput] = useState("");
  const [price1to1, setPrice1to1] = useState({
    "30min": { "3days": "", "4days": "", "5days": "", "6days": "" },
    "60min": { "3days": "", "4days": "", "5days": "", "6days": "" },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...formData,
      categories: categoriesInput.split(",").map((c) => c.trim()),
      price:
        formData.type === "1-to-1"
          ? {
              "30min": Object.fromEntries(
                Object.entries(price1to1["30min"]).map(([day, val]) => [
                  day,
                  Number(val),
                ])
              ),
              "60min": Object.fromEntries(
                Object.entries(price1to1["60min"]).map(([day, val]) => [
                  day,
                  Number(val),
                ])
              ),
            }
          : Number(formData.price),
    };

    try {
      const res = await fetch("/your-api-endpoint/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });

      const result = await res.json();
      console.log("Course added:", result);
      // Optional: reset form
      alert("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course");
    }
  };

  return (
    <div className="p-4">
      <DashboardBanner title="Add New Course" subTitle="New Course" />

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto mt-6 bg-white shadow p-6 rounded space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          className="input input-bordered w-full"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Course Description"
          className="textarea textarea-bordered w-full"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="url"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="tutor"
          placeholder="Tutor Name"
          className="input input-bordered w-full"
          value={formData.tutor}
          onChange={handleChange}
          required
        />

        {/* Type Selection */}
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="batch"
              checked={formData.type === "batch"}
              onChange={handleChange}
            />
            Batch
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value="1-to-1"
              checked={formData.type === "1-to-1"}
              onChange={handleChange}
            />
            1-to-1
          </label>
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured Course
        </label>

        <input
          type="text"
          placeholder="Categories (comma separated)"
          className="input input-bordered w-full"
          value={categoriesInput}
          onChange={(e) => setCategoriesInput(e.target.value)}
        />

        {/* Pricing */}
        {formData.type === "1-to-1" ? (
          <>
            <div>
              <h3 className="font-semibold mt-4 mb-2">30 Min Pricing</h3>
              <div className="grid grid-cols-2 gap-3">
                {["3days", "4days", "5days", "6days"].map((day) => (
                  <input
                    key={`30-${day}`}
                    type="number"
                    placeholder={`${day} price`}
                    className="input input-bordered w-full"
                    value={price1to1["30min"][day]}
                    onChange={(e) =>
                      setPrice1to1((prev) => ({
                        ...prev,
                        "30min": {
                          ...prev["30min"],
                          [day]: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mt-4 mb-2">60 Min Pricing</h3>
              <div className="grid grid-cols-2 gap-3">
                {["3days", "4days", "5days", "6days"].map((day) => (
                  <input
                    key={`60-${day}`}
                    type="number"
                    placeholder={`${day} price`}
                    className="input input-bordered w-full"
                    value={price1to1["60min"][day]}
                    onChange={(e) =>
                      setPrice1to1((prev) => ({
                        ...prev,
                        "60min": {
                          ...prev["60min"],
                          [day]: e.target.value,
                        },
                      }))
                    }
                    required
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <input
            type="number"
            name="price"
            placeholder="Batch Course Price"
            className="input input-bordered w-full"
            value={formData.price}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" className="btn btn-primary w-full">
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddNewCourse;
