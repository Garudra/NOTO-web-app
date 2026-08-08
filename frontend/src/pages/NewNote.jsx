import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";
import axios from "axios";

const NewNote = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pinned, setPinned] = useState(false);
  const [type, setType] = useState("personal");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      title,
      description: desc,
      pinned,
      type,
    };

    try {
      await axios.post("http://localhost:3000/api/note/create", data, {
        withCredentials: true,
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err.response?.status);
      console.log(err.response?.data);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeStyle = () => {
    switch (type) {
      case "personal":
        return "bg-orange-400/10 border-orange-400/20 text-orange-300";

      case "college":
        return "bg-blue-400/10 border-blue-400/20 text-blue-300";

      case "work":
        return "bg-green-400/10 border-green-400/20 text-green-300";

      case "ideas":
        return "bg-purple-400/10 border-purple-400/20 text-purple-300";

      case "others":
        return "bg-red-400/10 border-red-400/20 text-red-300";

      default:
        return "bg-white/5 border-white/10 text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-5 py-6 md:px-8">
      {/* TOP BAR */}
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm cursor-pointer"
        >
          <FaArrowLeftLong />
          Back
        </button>
      </div>

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mt-7">
        <h1 className="text-3xl md:text-4xl font-semibold text-white">
          Create New Note
        </h1>

        <p className="text-gray-400 mt-2">Capture your thoughts and ideas ✨</p>
      </div>

      {/* NOTE CARD */}
      <div className="max-w-4xl mx-auto mt-7">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* TITLE SECTION */}
          <div className="p-6 md:p-8 border-b border-white/10">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>

            <div className="flex items-center gap-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your note a title..."
                required
                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-lg placeholder:text-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

              {/* PIN BUTTON */}
              <button
                type="button"
                onClick={() => setPinned((prev) => !prev)}
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 transition cursor-pointer"
                title={pinned ? "Unpin note" : "Pin note"}
              >
                {pinned ? (
                  <TbPinnedFilled className="text-amber-300 text-xl" />
                ) : (
                  <TbPinned className="text-gray-400 text-xl hover:text-amber-300" />
                )}
              </button>
            </div>

            {pinned && (
              <p className="text-xs text-amber-300/80 mt-2">
                This note will be pinned to your dashboard.
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="p-6 md:p-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Note
            </label>

            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Start writing your note..."
              required
              className="w-full min-h-[280px] resize-y bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white text-sm leading-relaxed placeholder:text-gray-600 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* OPTIONS */}
          <div className="px-6 md:px-8 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              {/* CATEGORY */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={`border rounded-lg text-sm px-3 py-2 outline-none cursor-pointer capitalize transition bg-black/40 ${getTypeStyle()}`}
                >
                  <option value="personal" className="bg-black">
                    🟠 Personal
                  </option>

                  <option value="college" className="bg-black">
                    🔵 College
                  </option>

                  <option value="work" className="bg-black">
                    🟢 Work
                  </option>

                  <option value="ideas" className="bg-black">
                    🟣 Ideas
                  </option>

                  <option value="others" className="bg-black">
                    🔴 Others
                  </option>
                </select>
              </div>

              {/* SAVE */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/60 disabled:cursor-not-allowed text-white font-medium px-6 py-2.5 rounded-lg transition cursor-pointer"
              >
                <IoIosSave className="text-lg" />

                {loading ? "Saving..." : "Save Note"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNote;
