import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const [userName,setUser]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [emailConflict, setEmailConflict] = useState(false);
const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setEmailConflict(false);
            return;
        }

        try {
            const response = await fetch('https://clone-linkedin-backend.onrender.com/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    userName,
                    email,
                    password,
                }),
            });

            if (response.status === 200) {
                navigate('/home');

            } 
            else if (response.status === 409) {
                setEmailConflict(true);
                setError('');
            } 
            else if (response.status === 500) {
                setError("Internal Server Error");
                setEmailConflict(false);
            } 
            else {
                setError("Something went wrong. Please try again.");
                setEmailConflict(false);
            }

        } catch (err) {
            console.error("Error while sending data to server:", err.message);
            setError("Network error. Please check your connection.");
            setEmailConflict(false);
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
                        Make the most of your professional life
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
                    >
                     <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                value={userName}
                                onChange={(e) => setUser(e.target.value)}
                                required
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                       
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
                                Set Password
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

                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    onCopy={(e) => e.preventDefault()}
                                    onPaste={(e) => e.preventDefault()}
                                    onCut={(e) => e.preventDefault()}
                                    onContextMenu={(e) => e.preventDefault()}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                                        password && confirmPassword
                                            ? password === confirmPassword
                                                ? 'focus:ring-green-600 border-green-400'
                                                : 'focus:ring-red-600 border-red-400'
                                            : 'focus:ring-blue-600'
                                    }`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-2 top-2 text-sm text-blue-600"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            {password && confirmPassword && password !== confirmPassword && (
                                <p className="text-red-600 text-sm mt-1">Passwords do not match</p>
                            )}
                            {password && confirmPassword && password === confirmPassword && (
                                <p className="text-green-600 text-sm mt-1">Passwords match</p>
                            )}
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
                            </div>
                        )}

                        
                        <button
                            type="submit"
                            disabled={!email || !password || !confirmPassword || password !== confirmPassword}
                            className={`w-full py-3 rounded-md font-semibold transition ${
                                password === confirmPassword && password
                                    ? 'bg-blue-700 text-white hover:bg-blue-800'
                                    : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                            }`}
                        >
                            Agree & Join
                        </button>

                        {emailConflict && (
                            <div className="mt-5 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md p-3">
                                <p className="font-semibold mb-2">
                                    Email already in use — please log in instead.
                                </p>
                                <Link
                                    to="/"
                                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        )}
{/* just to clone the linkedin i have added this links */}
                        <p className="text-xs text-gray-500 text-center mt-6">
                            By clicking Agree & Join or Continue, you agree to the LinkedIn{' '}
                            <a href="#" className="text-blue-600 hover:underline">User Agreement</a>,{' '}
                            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                            <a href="#" className="text-blue-600 hover:underline">Cookie Policy</a>.
                        </p>
                        <div className='pt-4 flex justify-center'>
                            <pre>Already on ConnectUS? </pre>
                            <Link to='/' className='text-blue-600 font-bold hover:underline'>
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
