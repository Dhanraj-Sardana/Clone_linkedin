import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const fetchUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/cookie`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserName(data.user.name || "User");
      } else {
        navigate("/signin");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      navigate("/signin");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/all`, {
        credentials: "include",
      });
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sorted);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/posts/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ content }),
    });

    if (res.status === 201) {
      setContent("");
      fetchPosts();
    } else if (res.status === 401) {
      navigate("/signin");
    } else {
      alert("Failed to post. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
   
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#0077b5]">
          Connect
          <span className="bg-[#0077b5] text-white px-1 ml-1 rounded-sm">US</span>
        </h1>
        <div className="text-gray-700 font-semibold">
          Welcome, {userName || "User"}
        </div>
      </div>

      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-xl mx-auto space-y-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet.</p>
          ) : (
            posts.map((p) => (
              <div key={p._id} className="bg-white shadow p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-gray-800">
                    {p.user?.name || "Unknown"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(p.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">{p.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

    
      <div className="bg-white shadow-md p-4 border-t">
        <form onSubmit={handlePost} className="max-w-xl mx-auto flex flex-col">
          <textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#0077b5]"
            rows="2"
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-[#0077b5] text-white py-2 rounded-md font-semibold hover:bg-[#005c8a]"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
