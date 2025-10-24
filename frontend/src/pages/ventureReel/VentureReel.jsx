import React, { useState } from "react";

/* Import local images from src/assets */
import plantImg from "../../assets/plant.jpg";
import ringImg from "../../assets/i2.jpg";
import deskImg from "../../assets/i1.jpg";
import avatar1 from "../../assets/a1.png";
// import avatar2 from "../assets/avatar2.jpg";
// import avatar3 from "../assets/avatar3.jpg";

/* Posts data using local images */
const posts = [
  {
    id: 1,
    author: "Dr. Anya Sharma",
    role: "Founder & Innovator",
    title: "EcoGrow Smart Planter",
    description:
      "An AI-powered indoor gardening system that optimizes plant health, watering, and light for urban dwellers.",
    likes: 1543,
    comments: 212,
    image: plantImg,
    avatars: [avatar1, avatar1],
  },
  {
    id: 2,
    author: "Mark Chen",
    role: "Founder & Innovator",
    title: "PulseWear Health Ring",
    description:
      "A discreet smart ring offering continuous health monitoring, stress detection, and sleep analysis.",
    likes: 2310,
    comments: 355,
    image: ringImg,
    avatars: [avatar1, avatar1],
  },
  {
    id: 3,
    author: "Emily Davis",
    role: "Founder & Innovator",
    title: "FlexiDesk Modular Organizer",
    description:
      "A customizable desk organization system designed to adapt to any workspace and workflow, promoting productivity.",
    likes: 987,
    comments: 156,
    image: deskImg,
    avatars: [avatar1, avatar1],
  },
];

export default function Explore() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex md:flex-col w-72 bg-white border-r border-gray-200 p-6`}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white font-bold">
            <i className="fa-solid fa-gem"></i>
          </div>
          <span className="text-xl font-semibold text-orange-500">PitchHub</span>
        </div>

        <nav className="flex flex-col gap-3 text-sm">
          <a className="flex items-center gap-3 text-gray-700 hover:text-orange-500">
            <i className="fa-solid fa-house text-base w-5"></i> Home
          </a>
          <a className="flex items-center gap-3 text-gray-700 hover:text-orange-500">
            <i className="fa-solid fa-compass text-base w-5"></i> Discovery
          </a>
          <a className="flex items-center gap-3 text-gray-800 bg-gray-100 rounded-lg px-3 py-2 font-medium text-orange-500">
            <i className="fa-regular fa-lightbulb text-base w-5"></i> Explore
          </a>
        </nav>

        <div className="mt-auto pt-6 text-xs text-gray-400 border-t border-gray-100">
          <div className="flex gap-4">
            <a>Resources</a>
            <a>Legal</a>
            <a>Contact Us</a>
          </div>
          <p className="mt-4 text-gray-300 text-sm">Made with 💜</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b z-40">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-orange-200 to-orange-400 flex items-center justify-center text-white font-bold">
              <i className="fa-solid fa-gem"></i>
            </div>
            <span className="font-semibold">PitchHub</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        {mobileOpen && (
          <div className="px-4 pb-4">
            <nav className="flex flex-col gap-2 text-sm">
              <a className="flex items-center gap-3 text-gray-700">
                <i className="fa-solid fa-house w-5"></i> Home
              </a>
              <a className="flex items-center gap-3 text-gray-700">
                <i className="fa-solid fa-compass w-5"></i> Discovery
              </a>
              <a className="flex items-center gap-3 text-orange-500 font-medium">
                <i className="fa-regular fa-lightbulb w-5"></i> Explore
              </a>
            </nav>
          </div>
        )}
      </div>

      {/* Main content area */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-6 md:px-10 pt-24 md:pt-12 pb-20">
          <header className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">
              Explore Innovative Pitches
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2">
              Discover groundbreaking product ideas and connect with visionary entrepreneurs.
            </p>
          </header>

          <div className="space-y-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Media area */}
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[420px] md:h-[420px] object-cover"
                  />

                  {/* overlay author chip */}
                  <div className="absolute left-4 bottom-4 flex items-center gap-3 bg-black/70 text-white rounded-full px-3 py-2 backdrop-blur-sm">
                    <img
                      src={post.avatars[0]}
                      alt={post.author}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                    <div className="text-left">
                      <div className="text-sm font-semibold leading-tight">
                        {post.author}
                      </div>
                      <div className="text-xs text-gray-200 leading-tight">
                        {post.role}
                      </div>
                    </div>
                  </div>

                  {/* play button */}
                  <button className="absolute right-4 bottom-4 bg-white/90 hover:bg-white rounded-full p-3 shadow">
                    <i className="fa-solid fa-play text-gray-700"></i>
                  </button>
                </div>

                {/* Content body */}
                <div className="p-5">
                  <h2 className="text-base md:text-lg font-semibold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2 mb-4">{post.description}</p>

                  {/* stats row */}
                  <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-heart"></i>
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-regular fa-comment"></i>
                      <span>{post.comments}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-share"></i>
                      <span>Share</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <button className="text-sm text-gray-600 hover:underline mb-3">
                      View all {post.comments} comments
                    </button>

                    {/* sample comments */}
                    <div className="space-y-3 mb-3">
                      <div className="flex items-start gap-3">
                        <img src={post.avatars[1]} alt="c1" className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-sm font-semibold">Alex J.</div>
                          <div className="text-sm text-gray-600">This idea is revolutionary! I would definitely invest.</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <img src={post.avatars[0]} alt="c2" className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="text-sm font-semibold">Sarah K.</div>
                          <div className="text-sm text-gray-600">Love the clarity of the pitch. How scalable is this?</div>
                        </div>
                      </div>
                    </div>

                    {/* comment input */}
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                      />
                      <button className="px-3 py-2 rounded-md bg-gray-100 text-sm text-gray-700">Post</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Footer small */}
          <footer className="mt-10 text-center text-xs text-gray-400">
            Made with 💜 by PitchHub
          </footer>
        </div>
      </main>
    </div>
  );
}
