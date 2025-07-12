import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPen,
  FaTimes,
  FaSave,
  FaPlus,
  FaMapMarkerAlt,
  FaUserCircle,
  FaCamera,
  FaSignOutAlt
} from "react-icons/fa";

const INIT = JSON.parse(localStorage.getItem('userProfile')) || {
  name: "Your Name",
  location: "Unknown",
  avatar: "https://placehold.co/120x120/6366F1/FFFFFF?text=U",
  offers: [],
  wants: [],
  availability: [],
};

export default function UserDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(INIT);
  const [draft, setDraft] = useState(INIT);
  const [isEditing, setIsEditing] = useState(false);
  const [popup, setPopup] = useState("");
  const [newOffered, setNewOffered] = useState("");
  const [newWanted, setNewWanted] = useState("");

  const toggleArrayItem = (arrKey, val) => {
    setDraft((p) => ({
      ...p,
      [arrKey]: p[arrKey].includes(val)
        ? p[arrKey].filter((v) => v !== val)
        : [...p[arrKey], val],
    }));
  };

  const removeSkill = (key, skill) =>
    setDraft((p) => ({ ...p, [key]: p[key].filter((s) => s !== skill) }));

  const addSkill = (key, valSetter, value) => {
    if (!value.trim() || draft[key].includes(value.trim())) return;
    setDraft((p) => ({ ...p, [key]: [...p[key], value.trim()] }));
    valSetter("");
  };

  const handleSave = () => {
    if (!draft.name.trim()) return setPopup("Name cannot be empty.");
    if (!draft.location.trim()) return setPopup("Location cannot be empty.");
    if (draft.offers.length === 0)
      return setPopup("You must have at least one offered skill.");
    if (draft.wants.length === 0)
      return setPopup("You must have at least one wanted skill.");

    setProfile(draft);
    localStorage.setItem('userProfile', JSON.stringify(draft));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
    setPopup("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () =>
        setDraft((prev) => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    navigate('/'); // ✅ goes to landing page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {popup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center space-y-4">
            <p className="text-lg font-medium text-gray-800">{popup}</p>
            <button
              onClick={() => setPopup("")}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 text-white rounded-md shadow"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/70 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-5 sm:px-8 sm:py-6 border-b border-gray-200 bg-white/90">
          <h1 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">My Profile</h1>
          {!isEditing ? (
            <button
              onClick={() => {
                setDraft(profile);
                setIsEditing(true);
              }}
              className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-indigo-700 transition-all"
            >
              <FaPen className="text-xs" /> Edit Profile
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-emerald-700 transition-all"
              >
                <FaSave className="text-xs" /> Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-red-600 transition-all"
              >
                <FaTimes className="text-xs" /> Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8">
          {/* Avatar + Basics */}
          <aside className="flex flex-col items-center gap-6 lg:border-r lg:border-gray-200 lg:pr-8">
            <div className="relative">
              <img
                src={draft.avatar}
                alt="Avatar"
                className="h-32 w-32 rounded-full object-cover ring-4 ring-indigo-500 shadow-md"
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="avatar"
                    className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer shadow-md"
                    title="Change photo"
                  >
                    <FaCamera size={14} />
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div className="w-full space-y-5 text-base text-gray-700">
              <Field
                label="Name"
                icon={<FaUserCircle className="text-indigo-500" />}
                isEditing={isEditing}
                value={draft.name}
                onChange={(v) => setDraft({ ...draft, name: v })}
              />
              <Field
                label="Location"
                icon={<FaMapMarkerAlt className="text-indigo-500" />}
                isEditing={isEditing}
                value={draft.location}
                onChange={(v) => setDraft({ ...draft, location: v })}
              />
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full mt-4 gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-red-600 transition-all"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </aside>

          {/* Skills */}
          <section className="lg:col-span-2 space-y-8">
            <SkillBlock
              title="Skills Offered"
              color="blue"
              skills={draft.offers}
              isEditing={isEditing}
              onRemove={(s) => removeSkill("offers", s)}
              newVal={newOffered}
              setNewVal={setNewOffered}
              onAdd={() => addSkill("offers", setNewOffered, newOffered)}
            />
            <SkillBlock
              title="Skills Wanted"
              color="green"
              skills={draft.wants}
              isEditing={isEditing}
              onRemove={(s) => removeSkill("wants", s)}
              newVal={newWanted}
              setNewVal={setNewWanted}
              onAdd={() => addSkill("wants", setNewWanted, newWanted)}
            />

            <div>
              <h3 className="mb-3 font-semibold text-gray-800 text-lg">Availability</h3>
              <div className="flex flex-wrap gap-3">
                {["Weekdays", "Weekends", "Mornings", "Evenings", "Flexible"].map(
                  (slot) => (
                    <button
                      key={slot}
                      disabled={!isEditing && !draft.availability.includes(slot)}
                      onClick={() => isEditing && toggleArrayItem("availability", slot)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        draft.availability.includes(slot)
                          ? "bg-indigo-600 text-white shadow-md"
                          : isEditing
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-gray-100 text-gray-400 cursor-default"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, value, isEditing, onChange, icon }) => (
  <div className="space-y-1">
    <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
      {icon} {label}
    </label>
    {isEditing ? (
      <input
        className="w-full rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <p className="rounded-lg bg-gray-100 px-4 py-2 text-gray-800 shadow-sm">{value}</p>
    )}
  </div>
);

const SkillBlock = ({
  title,
  color,
  skills,
  isEditing,
  onRemove,
  newVal,
  setNewVal,
  onAdd,
}) => {
  const palette =
    color === "blue"
      ? {
          bg: "bg-blue-100",
          text: "text-blue-800",
          btn: "bg-blue-600",
          btnHover: "hover:bg-blue-700",
        }
      : {
          bg: "bg-green-100",
          text: "text-green-800",
          btn: "bg-green-600",
          btnHover: "hover:bg-green-700",
        };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s}
            className={`flex items-center gap-2 rounded-full ${palette.bg} ${palette.text} px-4 py-2 text-sm font-medium shadow-sm`}
          >
            {s}
            {isEditing && (
              <button
                onClick={() => onRemove(s)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </span>
        ))}
      </div>
      {isEditing && (
        <div className="mt-4 flex gap-3">
          <input
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            className="flex-1 rounded-lg border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
            placeholder={`Add new ${title.toLowerCase().replace("skills ", "")}...`}
          />
          <button
            onClick={onAdd}
            className={`rounded-lg ${palette.btn} ${palette.btnHover} px-4 text-white shadow-md flex items-center justify-center`}
          >
            <FaPlus size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
