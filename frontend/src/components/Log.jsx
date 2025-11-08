import { useState } from 'react';
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function Log() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [google, setGoogle] = useState(false);
    const [conflict, setConflict] = useState(false);
    const [sign, setSign] = useState(false);
// log is made for mannual login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setConflict(false);

        try {
            const response = await fetch('https://clone-linkedin-backend.onrender.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                    googleId: null
                }),
            });

            if (response.status === 200) {
                window.location.href = '/home';
            }
            else if (response.status === 409) {
                setConflict(true);
            }
            else if (response.status === 500) {
                setError("Internal Server Error. Please try again later.");
            } else if (response.status === 403) {
                setGoogle(true);
            }
            else {
                setError("Invalid credentials. Please check your email or password.");
                setSign(true);
            }

        } catch (err) {
            console.error("Error while sending data to server:", err.message);
            setError("Network error. Please check your connection.");
        }
    };

    return (
        <>
            <div className='bg-gray-50'>

                <div className="flex items-center pl-30 pt-6">
                    <h1 className="text-4xl font-bold text-[#0077b5]">Connect</h1>
                    <div className="bg-[#0077b5] text-white px-2 py-1 rounded-sm text-2xl font-bold ml-1">
                        US
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="text-3xl font-semibold mb-10 text-gray-800">
                        Welcome Back!
                    </div>

                    {google ?
                        <div className='flex items-center'>
                            <button onClick={() => window.open("https://clone-linkedin-backend.onrender.com/auth/google", "_self")} className="flex items-center justify-center w-full border rounded-full p-2 hover:bg-gray-50 transition">
                                <FcGoogle className="text-2xl mr-2 " />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        : <form
                            onSubmit={handleSubmit}
                            className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
                        >
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-sm text-blue-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center mb-6">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    defaultChecked
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            {error && (
                                <div className="text-red-600 bg-red-100 border border-red-400 rounded-md px-4 py-2 mb-4 text-center">
                                    {error}
                                    {sign && (
                                        <div className='flex mb-2 justify-center'>
                                            <Link to='/signin' className='mt-2 px-4 py-1 border border-[#0a66c2] text-[#0a66c2] rounded-full font-medium hover:bg-[#e8f3ff] transition'>Sign in</Link>
                                        </div>
                                    )}

                                </div>

                            )}

                            {conflict && (
                                <div className="text-yellow-800 bg-yellow-100 border border-yellow-400 rounded-md px-4 py-4 mb-4 text-center">
                                    <p className="mb-2 font-semibold">
                                        Gmail already in use! Please log in instead.
                                    </p>
                                    <Link
                                        to="/signin"
                                        className="inline-block bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2 px-4 rounded-md"
                                    >
                                        Go to Sign Up
                                    </Link>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={!email || !password}
                                className={`w-full py-3 rounded-md font-semibold transition ${password
                                        ? 'bg-blue-700 text-white hover:bg-blue-800'
                                        : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                                    }`}
                            >
                                Log In
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-6">
                                By clicking Log In or Continue, you agree to the ConnectUS{' '}
                                <a href="#" className="text-blue-600 hover:underline">User Agreement</a>,{' '}
                                <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                                <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>.
                            </p>
                        </form>}
                </div>
            </div>
        </>
    );
}
