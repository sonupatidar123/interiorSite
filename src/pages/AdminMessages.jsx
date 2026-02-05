import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Check karein ki Django mein ye endpoint 'messages/' hai ya 'contact/'
        const res = await api.get("messages/"); 
        setMessages(res.data);
      } catch (err) {
        console.error("Messages fetch karne mein error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Inquiry Messages</h2>
        <Link to="/addproject">
          <button style={{ padding: "8px 15px", cursor: "pointer" }}>← Back to Projects</button>
        </Link>
      </div>

      <hr />

      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ 
              background: "#f9f9f9", 
              padding: "15px", 
              borderRadius: "8px", 
              marginBottom: "10px",
              border: "1px solid #ddd" 
            }}>
              <p><strong>From:</strong> {msg.name}</p>
              <p><strong>Phone:</strong> {msg.phone}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <small style={{ color: "gray" }}>
                Received on: {new Date(msg.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}