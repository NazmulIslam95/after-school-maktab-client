/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Banner from "../../../Components/Banner/Banner";
import Navbar from "../../../Components/Navbar/Navbar";
import { FiBook, FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import useAxiosPublic from '../../../CustomHooks/useAxiosPublic';

const OurLibrary = () => {
  const axiosPublic = useAxiosPublic()
  const [pdfFiles, setPdfFiles] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [categories] = useState([
    "Quran",
    "Tajweed",
    "Tafsir",
    "Hadith",
    "Sunnah",
    "Fiqh",
    "Aqeedah",
    "Seerah",
    "Islamic History",
    "Dua & Dhikr",
    "Sirah Sahaba",
    "Arabic Language",
    "Islamic Ethics",
    "Comparative Religion",
    "Contemporary Issues",
    "Fiqh of Worship",
    "Family & Society",
    "Islamic Finance",
    "Tarbiyah",
    "Dawah"
  ]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axiosPublic.get('/pdfs');
        setPdfFiles(response.data);
        
        // Calculate category counts
        const counts = { All: response.data.length };
        categories.forEach(category => {
          counts[category] = response.data.filter(pdf => pdf.category === category).length;
        });
        setCategoryCounts(counts);
      } catch (err) {
        console.error('Failed to fetch PDFs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPdfs();
  }, []);

  const filteredPdfs = selectedCategory === 'All' 
    ? pdfFiles 
    : pdfFiles.filter(pdf => pdf.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Banner title="Our Islamic Library" subTitle="Knowledge for the Ummah" />

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Button */}
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center gap-2 bg-white p-3 rounded-lg shadow mb-4"
        >
          <FiFilter /> Filter by Category
          <FiChevronDown className={`transition-transform ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Category Filter Sidebar */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white p-4 rounded-lg shadow h-fit sticky top-4`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <FiFilter /> Categories
            </h3>
            <button 
              className="md:hidden text-gray-500"
              onClick={() => setShowMobileFilters(false)}
            >
              <FiX size={20} />
            </button>
          </div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {/* All Category */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setShowMobileFilters(false);
              }}
              className={`w-full text-left p-3 rounded transition-colors text-sm flex justify-between items-center
                ${selectedCategory === 'All' ? 
                  'bg-blue-50 text-blue-700 font-medium border border-blue-200' : 
                  'hover:bg-gray-100 text-gray-700'}`}
            >
              <span>All</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {categoryCounts.All || 0}
              </span>
            </button>

            {/* Other Categories */}
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowMobileFilters(false);
                }}
                className={`w-full text-left p-3 rounded transition-colors text-sm flex justify-between items-center
                  ${selectedCategory === category ? 
                    'bg-blue-50 text-blue-700 font-medium border border-blue-200' : 
                    'hover:bg-gray-100 text-gray-700'}`}
              >
                <span>{category}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {categoryCounts[category] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rest of your component remains the same */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPdfs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <FiBook className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                {selectedCategory === 'All' 
                  ? 'No books available yet' 
                  : `No books found in ${selectedCategory} category`}
              </h3>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredPdfs.map((pdf) => (
                <div key={pdf._id || pdf.id} className="group">
                  <a
                    href={pdf.driveUrl || pdf.formattedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center h-40 border border-gray-100 group-hover:border-blue-100">
                      <FiBook className="text-5xl text-blue-600 mb-2" />
                    </div>
                    <h3 className="mt-3 text-center font-medium text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {pdf.name || pdf.title}
                    </h3>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurLibrary;