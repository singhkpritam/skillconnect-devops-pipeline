import { Link } from "react-router-dom";

function SkillCard({ data, onDelete }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            {data.fullName}
          </h2>

          <p className="text-sm text-slate-500">
            {data.professionalTitle}
          </p>
        </div>

        <span className="text-xs px-2 py-1 bg-slate-200 text-slate-700 rounded-md">
          {data.category}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700">
        <p>
          <span className="font-medium">Skill:</span>{" "}
          {data.primarySkill}
        </p>

        <p>
          <span className="font-medium">Exp:</span>{" "}
          {data.experience}
        </p>

        <p>
          <span className="font-medium">Project:</span>{" "}
          {data.projectTitle}
        </p>

        <p>
          <span className="font-medium">Price:</span> ₹{data.price}
        </p>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        {data.description}
      </p>

      <div className="mt-4 flex items-center justify-between border-t pt-3">

        <div className="text-xs text-slate-500 space-y-1">
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>

        <div className="flex gap-2">

          <Link
            to={`/edit/${data._id}`}
            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Edit
          </Link>

          <button
            onClick={() => onDelete(data._id)}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default SkillCard;