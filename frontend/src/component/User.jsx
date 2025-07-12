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
  FaSignOutAlt,
} from "react-icons/fa";

const LS_KEY = "userProfile";
const DEFAULT_PROFILE = {
  name: "Sarah Johnson",
  location: "San Francisco, CA",
  avatar: "https://placehold.co/120x120/6366F1/FFFFFF?text=SJ",
  offers: ["Web Development", "UI/UX Design", "Photography"],
  wants: ["Digital Marketing", "Spanish Language"],
  availability: ["Weekends", "Mornings"],
  public: true,
};

// ──────────────────────────────────────────────────────────

export default function UserDashboard() {
  const navigate = useNavigate();

  // 1️⃣ – load from storage first
  const INIT = JSON.parse(localStorage.getItem(LS_KEY)) || DEFAULT_PROFILE;

  const [profile, setProfile] = useState(INIT);
  const [draft, setDraft] = useState(INIT);
  const [isEditing, setIsEditing] = useState(false);
  const [popup, setPopup] = useState("");
  const [newOffered, setNewOffered] = useState("");
  const [newWanted, setNewWanted] = useState("");

  // ─── helpers ────────────────────────────────────────────
  const toggleArrayItem = (key, val) => {
    setDraft((p) => ({
      ...p,
      [key]: p[key].includes(val)
        ? p[key].filter((v) => v !== val)
        : [...p[key], val],
    }));
  };

  const removeSkill = (key, skill) =>
    setDraft((p) => ({ ...p, [key]: p[key].filter((s) => s !== skill) }));

  const addSkill = (key, valSetter, value) => {
    const val = value.trim();
    if (!val || draft[key].includes(val)) return;
    setDraft((p) => ({ ...p, [key]: [...p[key], val] }));
    valSetter("");
  };

  const handleSave = () => {
    if (!draft.name.trim()) return setPopup("Name cannot be empty.");
    if (!draft.location.trim()) return setPopup("Location cannot be empty.");
    if (!draft.offers.length)
      return setPopup("You must have at least one offered skill.");
    if (!draft.wants.length)
      return setPopup("You must have at least one wanted skill.");

    setProfile(draft);
    localStorage.setItem(LS_KEY, JSON.stringify(draft)); // 🔐 persist
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setIsEditing(false);
    setPopup("");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setDraft((prev) => ({ ...prev, avatar: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    localStorage.removeItem(LS_KEY);
    navigate("/"); // ⏮ back to landing
  };

  // ─── UI ────────────────────────────────────────────────
  return (
    <>
      {/* validation popup */}
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-xl bg-white p-6 text-center shadow-lg">
            <p className="text-lg font-medium text-gray-800">{popup}</p>
            <button
              onClick={() => setPopup("")}
              className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {/* main card */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-2xl">
          {/* header */}
          <div className="flex flex-col items-center justify-between gap-3 border-b bg-white/90 px-6 py-6 sm:flex-row">
            <h1 className="mb-2 text-2xl font-bold text-gray-800 sm:mb-0">
              My Profile
            </h1>
            {!isEditing ? (
              <button
                onClick={() => {
                  setDraft(profile);
                  setIsEditing(true);
                }}
                className="flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm text-white shadow hover:bg-indigo-700"
              >
                <FaPen className="text-xs" />
                Edit Profile
              </button>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm text-white shadow hover:bg-emerald-700"
                >
                  <FaSave className="text-xs" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm text-white shadow hover:bg-red-600"
                >
                  <FaTimes className="text-xs" /> Cancel
                </button>
              </div>
            )}
          </div>

          {/* content */}
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-3">
            {/* sidebar */}
            <aside className="flex flex-col items-center gap-6 border-r border-gray-200">
              {/* avatar */}
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
                      className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-indigo-600 p-2 text-white shadow"
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

              {/* basics + public toggle + logout */}
              <div className="w-full space-y-5 text-sm text-gray-700">
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

                {/* public switch */}
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 shadow-sm">
                  <span className="font-medium">Public Profile</span>
                  <button
                    onClick={() =>
                      isEditing && setDraft({ ...draft, public: !draft.public })
                    }
                    className={`h-7 w-12 rounded-full transition-colors ${
                      draft.public ? "bg-indigo-600" : "bg-gray-300"
                    } ${isEditing ? "cursor-pointer" : "cursor-default opacity-60"}`}
                  >
                    <div
                      className={`h-5 w-5 transform rounded-full bg-white transition-transform ${
                        draft.public ? "translate-x-[22px]" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* logout */}
                <button
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white shadow hover:bg-red-600"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </aside>

            {/* skills & availability */}
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

              {/* availability */}
              <div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Availability
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Weekdays", "Weekends", "Mornings", "Evenings", "Flexible"].map(
                    (slot) => (
                      <button
                        key={slot}
                        disabled={!isEditing && !draft.availability.includes(slot)}
                        onClick={() =>
                          isEditing && toggleArrayItem("availability", slot)
                        }
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          draft.availability.includes(slot)
                            ? "bg-indigo-600 text-white shadow"
                            : isEditing
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "cursor-default bg-gray-100 text-gray-400"
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
    </>
  );
}

// ─── reusable sub‑components ──────────────────────────────
const Field = ({ label, value, isEditing, onChange, icon }) => (
  <div className="space-y-1">
    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
      {icon} {label}
    </label>
    {isEditing ? (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
      />
    ) : (
      <p className="rounded-lg bg-gray-100 px-4 py-2 text-gray-800 shadow-sm">
        {value}
      </p>
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
          hover: "hover:bg-blue-700",
        }
      : {
          bg: "bg-green-100",
          text: "text-green-800",
          btn: "bg-green-600",
          hover: "hover:bg-green-700",
        };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {/* pills */}
      <div className="flex flex-wrap gap-3">
        {skills.map((s) => (
          <span
            key={s}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm ${palette.bg} ${palette.text}`}
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
      {/* input */}
      {isEditing && (
        <div className="mt-3 flex gap-3">
          <input
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="Add new skill..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={onAdd}
            className={`flex items-center justify-center rounded-lg px-4 text-white shadow-md ${palette.btn} ${palette.hover}`}
          >
            <FaPlus size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
