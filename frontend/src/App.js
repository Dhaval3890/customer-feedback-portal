import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const API_URL = "http://YOUR_VM_IP:8000";

  const submitFeedback = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating: Number(rating), comment }),
    });
    loadFeedbacks();
  };

  const loadFeedbacks = async () => {
    const res = await fetch(`${API_URL}/feedback`);
    const data = await res.json();
    setFeedbacks(data);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Customer Feedback Portal</h1>
      <form onSubmit={submitFeedback}>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          value={rating}
          onChange={e => setRating(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>All Feedback</h2>
      <ul>
        {feedbacks.map((f, i) => (
          <li key={i}>
            {f.name} ({f.rating}) - {f.comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
