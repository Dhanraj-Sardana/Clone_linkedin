import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate  } from "react-router-dom";


const Login = () => {
    const navigate=useNavigate();
    const handleMannualLogin=()=>{
            navigate('/login');
    }
    const handleGoogle= ()=>{
window.open("http://localhost:5000/auth/google", "_self")
    }
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      
      <div className="flex-1 flex flex-col justify-center px-8 md:px-20">
        
        <div className="flex items-center mb-10">
          <h1 className="text-4xl font-bold text-[#0077b5]">Connect</h1>
          <div className="bg-[#0077b5] text-white px-2 py-1 rounded-sm text-2xl font-bold ml-1">
            US
          </div>
        </div>

        
        <h1 className="text-4xl font-light mb-2">Welcome to your</h1>
        <h1 className="text-4xl font-light mb-8">professional community</h1>

        
        <div className="space-y-4 max-w-md">
          
          <button onClick={handleGoogle} className="flex items-center justify-center w-full border rounded-full py-2 hover:bg-gray-50 transition">
            <FcGoogle className="text-2xl mr-2" />
            <span>Continue with Google</span>
          </button>

         

          
          <button onClick={handleMannualLogin} className="flex items-center justify-center w-full border rounded-full py-2 hover:bg-gray-50 transition">
            <span>Log in with email</span>
          </button>
        </div>

        
        <div className="flex flex-col items-center">
        <p className="text-xs text-gray-500 mt-6 max-w-md">
          By clicking Continue to join or sign in, you agree to ConnectUS’s{" "}
          <span className="text-[#0077b5] cursor-pointer hover:underline">
            User Agreement
          </span>
          ,{" "}
          <span className="text-[#0077b5] cursor-pointer hover:underline">
            Privacy Policy
          </span>{" "}
          and{" "}
          <span className="text-[#0077b5] cursor-pointer hover:underline">
            Cookie Policy
          </span>
          .
        </p>
<div>
        <p className="text-sm text-gray-700 mt-4">
          New to ConnectUS?{" "}
          <Link to='/signin' className="text-[#0077b5] font-medium cursor-pointer hover:underline">
            Join now
          </Link>
        </p>
        </div>
        </div>
      </div>

     
      <div className="flex w-1/2 flex-col ">
      <div className="flex justify-end pr-15">
      <Link className=" mt-2 px-4 py-1 border border-[#0a66c2] text-[#0a66c2] rounded-full font-medium hover:bg-[#e8f3ff] transition" to='/signin'>Sign in</Link>
     </div>
      <div
        className="flex-1 hidden md:flex justify-center items-center bg-cover bg-center mt-3 mr-2"
        style={{
          backgroundImage:
            "url('/connectUS_image.jpg')",
        }}
      >
        <div className="bg-black/30 text-white text-4xl font-semibold p-4 rounded">
          Join with <span className="bg-white text-[#0077b5] px-2 rounded">US</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;
