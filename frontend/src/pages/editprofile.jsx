import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    professionalTitle: "",
    primarySkill: "",
    experience: "",
    category: "",
    projectTitle: "",
    description: "",
    price: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/skills/${id}`
      );

      setForm(response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/skills/${id}`,
        form
      );

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 pt-24">

      <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-xl p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-800">
          Edit Freelancer Profile
        </h2>

        <p className="text-sm text-slate-500 mb-6">
          Update freelancer details
        </p>

        {success && (
          <div className="mb-4 p-3 rounded-md bg-green-100 border border-green-300 text-green-700">
            Freelancer Profile Updated Successfully
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            name="fullName"
            value={form.fullName}
            onChange={onChange}
            placeholder="Full Name"
            required
            className="input"
          />

          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email"
            required
            className="input"
          />

          <input
            name="professionalTitle"
            value={form.professionalTitle}
            onChange={onChange}
            placeholder="Professional Title"
            className="input"
          />

          <input
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="Category"
            className="input"
          />

          <input
            name="primarySkill"
            value={form.primarySkill}
            onChange={onChange}
            placeholder="Primary Skill"
            className="input"
          />

          <input
            name="experience"
            value={form.experience}
            onChange={onChange}
            placeholder="Experience"
            className="input"
          />

          <input
            name="projectTitle"
            value={form.projectTitle}
            onChange={onChange}
            placeholder="Project Title"
            className="input md:col-span-2"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Description"
            className="input md:col-span-2 resize-none h-28"
          />

          <input
            name="price"
            value={form.price}
            onChange={onChange}
            placeholder="Price"
            className="input"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone"
            minLength="10"
            maxLength="10"
            required
            className="input"
          />

          <button
            type="submit"
            className="md:col-span-2 bg-slate-800 text-white py-2 rounded-md hover:bg-slate-700 transition"
          >
            Update Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfile;


