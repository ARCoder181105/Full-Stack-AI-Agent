import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Tickets() {
  const [form, setForm] = useState({ title: "", description: "" });
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });
      const data = await res.json();
      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setForm({ title: "", description: "" });
        fetchTickets(); // Refresh list
      } else {
        alert(data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#0f0f0f] pt-24 px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-[#1c1c1e] shadow-2xl rounded-2xl p-6 text-white">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">Create a Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ticket Title"
              className="input input-bordered w-full text-lg bg-[#121212] text-white placeholder-gray-400"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Ticket Description"
              className="textarea textarea-bordered w-full text-base bg-[#121212] text-white placeholder-gray-400"
              rows={4}
              required
            ></textarea>
            <button
              className="btn btn-info w-full text-lg hover:scale-[1.02] hover:brightness-110 transition-transform duration-200"
              type="submit"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>

        <div className="max-w-3xl mx-auto mt-10 text-white">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300">Submitted Tickets</h2>
          <div className="space-y-4">
            {tickets.length === 0 && (
              <p className="text-gray-500">No tickets submitted yet.</p>
            )}
            {tickets.map((ticket) => (
              <Link
                key={ticket._id}
                to={`/tickets/${ticket._id}`}
                className="block bg-[#1e1e1e] border border-[#333] rounded-xl p-4 shadow-md hover:border-cyan-400 hover:shadow-cyan-600/20 transition-all duration-200"
              >
                <h3 className="font-bold text-lg text-cyan-300">{ticket.title}</h3>
                <p className="text-sm mt-1 text-gray-300">{ticket.description}</p>
                <p className="text-xs mt-2 text-gray-500">
                  Created: {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
