import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/navbar";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            method: "GET",
          }
        );
        const data = await res.json();
        if (res.ok) {
          setTicket(data.ticket);
        } else {
          alert(data.message || "Failed to fetch ticket");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading)
    return <div className="text-center mt-24 text-white">Loading ticket details...</div>;
  if (!ticket) return <div className="text-center mt-24 text-red-400">Ticket not found</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#121212] pt-24 px-4 pb-10">
        <div className="max-w-3xl mx-auto bg-[#1e1e1e] text-white shadow-2xl rounded-2xl p-6">
          <h2 className="text-3xl font-bold mb-6 text-purple-400">Ticket Details</h2>

          <div className="bg-[#2a2a2a] p-6 rounded-xl space-y-4 border border-purple-700 shadow-lg">
            <h3 className="text-2xl font-semibold text-pink-400">{ticket.title}</h3>
            <p className="text-gray-300 text-base">{ticket.description}</p>

            {ticket.status && (
              <>
                <div className="border-t border-gray-600 pt-4">
                  <p>
                    <strong className="text-blue-400">Status:</strong> {ticket.status}
                  </p>
                  {ticket.priority && (
                    <p>
                      <strong className="text-blue-400">Priority:</strong> {ticket.priority}
                    </p>
                  )}

                  {ticket.relatedSkills?.length > 0 && (
                    <p>
                      <strong className="text-blue-400">Related Skills:</strong> {ticket.relatedSkills.join(", ")}
                    </p>
                  )}

                  {ticket.helpfulNotes && (
                    <div>
                      <strong className="text-blue-400">Helpful Notes:</strong>
                      <div className="prose prose-invert max-w-none rounded mt-2 text-gray-200">
                        <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                      </div>
                    </div>
                  )}

                  {ticket.assignedTo && (
                    <p>
                      <strong className="text-blue-400">Assigned To:</strong> {ticket.assignedTo?.email}
                    </p>
                  )}

                  {ticket.createdAt && (
                    <p className="text-sm text-gray-500 mt-2">
                      Created At: {new Date(ticket.createdAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}