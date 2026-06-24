import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between p-4 bg-black text-white font-bold text-xl z-50">
      <h1>SkillBridge</h1>

      <div className="flex gap-3">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        {/* <Link to="/edit/1">Edit</Link> */}
      </div>
    </div>
  );
}

export default Navbar;