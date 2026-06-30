import { useState, useEffect } from "react";
import axios from "axios";
import SkillCard from "../components/skillcard";

function SkillHomes() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/skills`
      );

      setData(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const deleteSkill = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/skills/${id}`
      );

      fetchFreelancers();
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      item.primarySkill?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6 pt-24">
      <h2 className="text-3xl font-bold mb-6">
        Available Skill People 
      </h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name, Skill or Category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
        />
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center text-slate-500 mt-10">
          No Freelancer Found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item) => (
            <SkillCard
              key={item._id}
              data={item}
              onDelete={deleteSkill}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillHomes;
