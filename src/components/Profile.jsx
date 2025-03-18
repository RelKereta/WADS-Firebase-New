import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    description: "",
  });

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfile(userSnap.data());
        setFormData(userSnap.data());
      }

      setLoading(false);
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, formData, { merge: true });

    setProfile(formData);
    setEditMode(false);
  };

  if (loading) return <div className="text-center text-xl text-gray-700">Loading profile...</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg mt-6">
      <h1 className="text-2xl font-semibold text-center mb-4 text-black">Profile</h1>

      {editMode ? (
        <div className="space-y-3">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-md text-black" />
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-black" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-black">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Write about yourself..." className="w-full p-2 border border-gray-300 rounded-md text-black"></textarea>
          
          <button onClick={handleSave} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Save Profile</button>
        </div>
      ) : (
        <div className="space-y-3 text-black">
          <p><strong>Name:</strong> {profile?.name || "Not provided"}</p>
          <p><strong>Date of Birth:</strong> {profile?.dob || "Not provided"}</p>
          <p><strong>Gender:</strong> {profile?.gender || "Not provided"}</p>
          <p><strong>About Me:</strong> {profile?.description || "Not provided"}</p>

          <button onClick={() => setEditMode(true)} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Edit Profile</button>
          <button onClick={logout} className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 mt-2">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
