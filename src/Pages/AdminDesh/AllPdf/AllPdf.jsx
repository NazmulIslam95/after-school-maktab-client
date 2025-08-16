/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  FiUpload,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiExternalLink,
} from "react-icons/fi";
import DashboardBanner from "../../../Components/DashboardBanner/DashboardBanner";
import useAxiosSecure from "../../../CustomHooks/useAxiosSecure";

const AllPdf = () => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    name: "",
    driveLink: "",
    category: "",
  });

  // PDF list state
  const [pdfList, setPdfList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState([
    "Quran", // Holy Quran texts
    "Tajweed", // Quran recitation rules
    "Tafsir", // Quranic exegesis
    "Hadith", // Prophet's sayings
    "Sunnah", // Prophet's practices
    "Fiqh", // Islamic jurisprudence
    "Aqeedah", // Islamic creed
    "Seerah", // Prophet's biography
    "Islamic History",
    "Dua & Dhikr", // Supplications
    "Sirah Sahaba", // Companions' biographies
    "Arabic Language",
    "Islamic Ethics",
    "Comparative Religion",
    "Contemporary Issues",
    "Fiqh of Worship", // Salah, Sawm, Zakat, Hajj
    "Family & Society",
    "Islamic Finance",
    "Tarbiyah", // Islamic education
    "Dawah", // Islamic propagation
  ]);

  // Fetch PDFs on component mount
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const { data } = await axiosSecure.get("/pdfs");
        setPdfList(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        Swal.fire("Error!", "Failed to load PDFs", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchPdfs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Format Google Drive link
  const formatDriveLink = (link) => {
    try {
      // eslint-disable-next-line no-useless-escape
      const fileIdMatch = link.match(/\/file\/d\/([^\/]+)/);
      if (!fileIdMatch) throw new Error("Invalid Google Drive link");
      return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
    } catch (error) {
      console.error("Error formatting link:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedLink = formatDriveLink(formData.driveLink);
    if (!formattedLink) {
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "Please enter a valid Google Drive link",
      });
      return;
    }

    try {
      const { data } = await axiosSecure.post("/pdf", {
        ...formData,
        formattedLink,
      });

      setPdfList([...pdfList, data]);
      setFormData({ name: "", driveLink: "", category: "" });

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "PDF added successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.response?.data?.error || "Failed to upload PDF",
      });
    }
  };

  // Handle PDF deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/pdf/${id}`);
        setPdfList(pdfList.filter((pdf) => pdf._id !== id));
        Swal.fire("Deleted!", "The PDF has been deleted.", "success");
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        Swal.fire("Error!", "Failed to delete PDF.", "error");
      }
    }
  };

  // Toggle PDF visibility
  const toggleVisibility = async (id) => {
    const pdf = pdfList.find((p) => p._id === id);
    const newVisibility = !pdf.isHidden;

    try {
      await axiosSecure.patch(`/pdf/${id}/visibility`, {
        isHidden: newVisibility,
      });

      setPdfList(
        pdfList.map((p) =>
          p._id === id ? { ...p, isHidden: newVisibility } : p
        )
      );
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire("Error!", "Failed to update visibility.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <DashboardBanner title="All PDFs" subTitle="Manage your PDF collection" />

      {/* Upload Section */}
      <section className="mb-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload New PDF</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PDF Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Drive Link
            </label>
            <input
              type="url"
              name="driveLink"
              value={formData.driveLink}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://drive.google.com/file/d/..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Make sure the link is shared with "Anyone with the link"
              permission
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            <FiUpload className="mr-2" />
            Upload PDF
          </button>
        </form>
      </section>

      {/* PDF List Section */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your PDF Collection</h2>
          <span className="text-sm text-gray-500">
            {pdfList.length} {pdfList.length === 1 ? "PDF" : "PDFs"}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : pdfList.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiFileText className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No PDFs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Upload your first PDF using the form above
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pdfList.map((pdf) => (
                  <tr key={pdf._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <FiExternalLink className="text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {pdf.name}
                          </div>
                          <a
                            href={pdf.formattedLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            View PDF
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {pdf.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${pdf.isHidden ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                      >
                        {pdf.isHidden ? "Hidden" : "Visible"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => toggleVisibility(pdf._id)}
                        className="text-gray-500 hover:text-blue-600 mr-4"
                        title={pdf.isHidden ? "Show PDF" : "Hide PDF"}
                      >
                        {pdf.isHidden ? (
                          <FiEye size={18} />
                        ) : (
                          <FiEyeOff size={18} />
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(pdf._id)}
                        className="text-gray-500 hover:text-red-600"
                        title="Delete PDF"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllPdf;
