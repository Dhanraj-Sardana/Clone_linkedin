import { useEffect, useState } from "react";

export default function Logout() {
  const [flag, setFlag] = useState(false);

  const handleLogout = async () => {
    setFlag(false);
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (res.status === 200) {
      setFlag(true);
    }
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      {!flag ? (
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Logging you out...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 transition-all duration-300">
          <div className="text-5xl">✅</div>
          <p className="text-xl font-semibold">Successfully Logged Out</p>
          <p className="text-gray-600 text-sm">We hope to see you again soon!</p>
        </div>
      )}
    </div>
  );
}