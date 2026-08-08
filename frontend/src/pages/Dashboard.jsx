import React, { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/note/get", {
          withCredentials: true,
        });

        setNotes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleTogglePin = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/note/toggle-pin/${id}`,
        {},
        {
          withCredentials: true,
        },
      );

      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? res.data : note)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/note/delete/${id}`, {
        withCredentials: true,
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getNoteColor = (type) => {
    switch (type) {
      case "personal":
        return "bg-orange-400/10 border-orange-400/20";

      case "college":
        return "bg-blue-400/10 border-blue-400/20";

      case "work":
        return "bg-green-400/10 border-green-400/20";

      case "ideas":
        return "bg-purple-400/10 border-purple-400/20";

      case "others":
        return "bg-red-400/10 border-red-400/20";

      default:
        return "bg-white/5 border-white/10";
    }
  };

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const query = search.toLowerCase();

      return (
        note.title?.toLowerCase().includes(query) ||
        note.description?.toLowerCase().includes(query) ||
        note.type?.toLowerCase().includes(query)
      );
    });
  }, [notes, search]);

  const pinnedCount = notes.filter((note) => note.pinned).length;

  return (
    <Layout>
      <div className="min-h-screen bg-transparent px-5 py-6 md:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Your workspace</p>

            <h1 className="text-3xl font-semibold text-white">My Notes</h1>

            <p className="text-sm text-gray-400 mt-1">
              Capture your thoughts and keep them organized.
            </p>
          </div>

          {/* NEW NOTE */}
          <button
            onClick={() => navigate("/new-note")}
            type="button"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition cursor-pointer"
          >
            <FaPlus className="text-sm" />
            New Note
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-7">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4">
            <p className="text-sm text-gray-400">Total notes</p>

            <p className="text-2xl font-semibold text-white mt-1">
              {notes.length}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4">
            <p className="text-sm text-gray-400">Pinned</p>

            <p className="text-2xl font-semibold text-white mt-1">
              {pinnedCount}
            </p>
          </div>

          <div className="hidden md:block bg-white/5 border border-white/10 backdrop-blur-md rounded-xl p-4">
            <p className="text-sm text-gray-400">Categories</p>

            <p className="text-2xl font-semibold text-white mt-1">
              {new Set(notes.map((note) => note.type)).size}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mt-7">
          <div className="relative max-w-xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />

            <input
              type="text"
              placeholder="Search your notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        {/* NOTES HEADER */}
        <div className="flex items-center justify-between mt-9 mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Your notes</h2>

            <p className="text-xs text-gray-500 mt-0.5">
              {filteredNotes.length}{" "}
              {filteredNotes.length === 1 ? "note" : "notes"}
            </p>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-7 h-7 border-2 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredNotes.length === 0 && (
          <div className="border border-dashed border-white/10 rounded-2xl py-20 px-6 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-white/5 flex items-center justify-center">
              <FaPlus className="text-gray-500" />
            </div>

            <h3 className="text-white font-medium mt-5">
              {search ? "No notes found" : "You don't have any notes yet"}
            </h3>

            <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">
              {search
                ? "Try searching with a different keyword."
                : "Create your first note and start organizing your thoughts."}
            </p>

            {!search && (
              <button
              onClick={() => navigate("/new-note")}
                type="button"
                className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
              >
                <FaPlus className="text-xs" />
                Create your first note
              </button>
            )}
          </div>
        )}

        {/* NOTES GRID */}
        {!loading && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className={`group relative p-5 rounded-2xl border backdrop-blur-md shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${getNoteColor(
                  note.type,
                )}`}
              >
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-semibold text-white break-words">
                    {note.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => handleTogglePin(note._id)}
                    className="flex-shrink-0 p-1.5 rounded-md hover:bg-white/10 transition cursor-pointer"
                    title={note.pinned ? "Unpin note" : "Pin note"}
                  >
                    {note.pinned ? (
                      <TbPinnedFilled className="text-amber-300 text-lg" />
                    ) : (
                      <TbPinned className="text-gray-400 text-lg hover:text-amber-300" />
                    )}
                  </button>
                </div>

                {/* DESCRIPTION */}
                <p className="mt-3 text-sm text-gray-400 leading-relaxed max-h-36 overflow-y-auto overflow-x-hidden break-words">
                  {note.description}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-500 capitalize">
                    {note.type}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDeleteNote(note._id)}
                    className="p-1.5 rounded-md text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition cursor-pointer"
                    title="Delete note"
                  >
                    <MdDelete className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
