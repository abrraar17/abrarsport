// src/components/AdminVisits.jsx
import { useEffect, useState } from "react";

export default function AdminVisits() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/getVisits")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch visits");
        return res.json();
      })
      .then((data) => {
        setVisits(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("getVisits error:", err);
        setLoading(false);
      });
  }, []);

  function shortAgent(ua) {
    if (!ua) return "-";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone")) return "iPhone";
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "Mac";
    if (ua.includes("Linux")) return "Linux";
    return "Other";
  }

  return (
    <div>
      <h3>Site Visits</h3>

      {loading && <p>Loading visits...</p>}

      {!loading && visits.length === 0 && <p>No visit data available.</p>}

      {!loading && visits.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={th}>#</th>
              <th style={th}>Time</th>
              <th style={th}>Page</th>
              <th style={th}>IP Address</th>
              <th style={th}>Device</th>
            </tr>
          </thead>

          <tbody>
            {visits.map((v, i) => (
              <tr key={v.id || i}>
                <td style={td}>{i + 1}</td>

                <td style={td}>
                  {v.created_at
                    ? new Date(v.created_at).toLocaleString()
                    : "-"}
                </td>

                <td style={td}>{v.path || "-"}</td>

                <td style={td}>{v.ip_address || "-"}</td>

                <td style={td}>{shortAgent(v.user_agent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  padding: "8px",
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};
