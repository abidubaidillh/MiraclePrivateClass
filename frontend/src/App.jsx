import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/programs") // backend API
      .then(res => setPrograms(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Miracle Private</h1>
      <h2>Program Kami</h2>
      <ul>
        {programs.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> – {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;