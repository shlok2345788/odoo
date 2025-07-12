import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Navbar from "../basic/Navbar"; // Adjusted for src/component/Home.jsx
import Footer from "../basic/Footer"; // Adjusted for src/component/Home.jsx

// Mock user data with offers, wants, and availability
const mockUsers = [
  {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://randomuser.me/api/portraits/women/40.jpg",
    rating: 4.8,
    offers: ["JavaScript", "React"],
    wants: ["UI Design"],
    availability: ["Weekends", "Evenings"],
  },
  {
    id: 2,
    name: "Marcus Johnson",
    avatar: "https://randomuser.me/api/portraits/men/83.jpg",
    rating: 4.6,
    offers: ["Photoshop", "Illustrator"],
    wants: ["Python"],
    availability: ["Weekdays", "Evenings"],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.9,
    offers: ["Spanish", "Content Writing"],
    wants: ["Video Editing"],
    availability: ["Weekends"],
  },
  {
    id: 4,
    name: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.7,
    offers: ["Node.js", "MongoDB"],
    wants: ["DevOps"],
    availability: ["Weekdays"],
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4.5,
    offers: ["Marketing", "SEO"],
    wants: ["Data Analysis"],
    availability: ["Weekdays", "Evenings"],
  },
  {
    id: 6,
    name: "Alex Rivera",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 4.8,
    offers: ["Guitar", "Music Theory"],
    wants: ["Audio Production"],
    availability: ["Weekends"],
  },
  {
    id: 7,
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 4.9,
    offers: ["French", "Cooking"],
    wants: ["Yoga", "Meditation"],
    availability: ["Weekends", "Evenings"],
  },
  {
    id: 8,
    name: "Mike Rodriguez",
    avatar: "https://randomuser.me/api/portraits/men/99.jpg",
    rating: 4.7,
    offers: ["Guitar", "Music Theory"],
    wants: ["Python", "Data Science"],
    availability: ["Weekdays"],
  },
  {
    id: 9,
    name: "John Lee",
    avatar: "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 4.3,
    offers: ["Figma", "UI/UX"],
    wants: ["React", "Tailwind"],
    availability: ["Weekends"],
  },
  {
    id: 10,
    name: "Ava Brooks",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 4.6,
    offers: ["Excel", "Data Entry"],
    wants: ["Accounting"],
    availability: ["Weekdays", "Evenings"],
  },
  {
    id: 11,
    name: "Brian Scott",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    rating: 4.1,
    offers: ["Video Editing"],
    wants: ["Voice Over"],
    availability: ["Evenings"],
  },
  {
    id: 12,
    name: "Zoe Carter",
    avatar: "https://randomuser.me/api/portraits/women/73.jpg",
    rating: 4.8,
    offers: ["Photography", "Photo Editing"],
    wants: ["Lightroom", "Retouching"],
    availability: ["Weekends", "Evenings"],
  },
];

export default function Home() {
  const [skillQuery, setSkillQuery] = useState("");
  const [availability, setAvailability] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  // Filter users based on skill query and availability
  const filteredUsers = mockUsers.filter((user) => {
    const skillMatch =
      skillQuery === "" ||
      user.offers.concat(user.wants).some((skill) =>
        skill.toLowerCase().includes(skillQuery.toLowerCase())
      );
    const timeMatch = availability === "" || user.availability.includes(availability);
    return skillMatch && timeMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / perPage);
  const paginatedUsers = filteredUsers.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="bg-white px-4 py-10">
          {/* Page Header */}
          <h1 className="text-center text-3xl font-bold text-slate-900">
            Find Your Perfect Skill Match
          </h1>
          <p className="mt-2 text-center text-slate-600">
            Connect with talented people ready to share their expertise
          </p>

          {/* Search and Filter Section */}
          <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grow basis-60">
              <input
                type="text"
                placeholder="Search by skill (e.g., JavaScript)"
                className="w-full rounded-md border border-slate-300 bg-white py-2 px-4 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300"
                value={skillQuery}
                onChange={(e) => {
                  setSkillQuery(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <select
              className="basis-36 rounded-md border border-slate-300 py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-indigo-400"
              value={availability}
              onChange={(e) => {
                setAvailability(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Any time</option>
              <option value="Weekdays">Weekdays</option>
              <option value="Weekends">Weekends</option>
              <option value="Evenings">Evenings</option>
            </select>
          </div>

          {/* Results Section */}
          <div className="mx-auto mt-10 max-w-6xl">
            <p className="mb-4 text-sm text-slate-600">
              Showing {paginatedUsers.length} of {filteredUsers.length} results
            </p>

            {/* User Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedUsers.map((user) => (
                <article
                  key={user.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {user.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-500">
                        <FaStar />
                        <span className="text-slate-600">{user.rating}/5</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills Details */}
                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-slate-700 flex items-center gap-1">
                        💡 <span>Offers</span>
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {user.offers.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 flex items-center gap-1">
                        🎯 <span>Wants</span>
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {user.wants.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-800 shadow-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-slate-700 flex items-center gap-1">
                        🕒 <span>Availability</span>
                      </p>
                      <div className="mt-1 flex flex-wrap gap-2">
                        {user.availability.map((slot) => (
                          <span
                            key={slot}
                            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-800 shadow-sm"
                          >
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="mt-6 block w-full rounded-md bg-indigo-800 py-2 text-sm font-medium text-white hover:bg-indigo-900">
                    Send Request
                  </button>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="rounded p-2 text-slate-500 hover:text-slate-700"
                disabled={page === 1}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`rounded px-3 py-1 text-sm ${
                    page === i + 1 ? "bg-indigo-800 text-white" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="rounded p-2 text-slate-500 hover:text-slate-700"
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}