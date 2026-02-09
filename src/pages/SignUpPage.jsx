import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import axios from "axios";
 import { Link, useNavigate } from "react-router"; 


const SignUpPage = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "MEMBER",
  });

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
console.log("Signup ", signupData);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register", signupData );
 
      console.log("Signup success:", res);
if(res.status === 200){
       navigate("/login");
}else{
  alert(res.data.message || "Signup failed");
  setError(res.data.message || "Signup failed");
}
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsPending(false);
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-6 overflow-y-auto"
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-xl shadow-lg max-h-[95vh] overflow-hidden">
        
        {/* LEFT – FORM */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 overflow-y-auto">
          {/* LOGO */}
          <div className="mb-4 flex items-center gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Streamify
            </span>
          </div>

          {/* ERROR */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response?.data?.message}</span>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Create an Account</h2>
              <p className="text-sm opacity-70">
                Join Streamify and start your language learning adventure!
              </p>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="John Doe"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />
            </div>

            {/* EMAIL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="john@gmail.com"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            {/* ROLE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`btn w-1/2 ${
                    signupData.role === "MEMBER"
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, role: "MEMBER" })
                  }
                >
                  MEMBER
                </button>
                <button
                  type="button"
                  className={`btn w-1/2 ${
                    signupData.role === "ADMIN"
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                  onClick={() =>
                    setSignupData({ ...signupData, role: "ADMIN" })
                  }
                >
                  ADMIN
                </button>
              </div>
            </div>

            {/* PASSWORD */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered"
                placeholder="********"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <p className="text-xs opacity-70 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* SUBMIT */}
            <button className="btn btn-primary w-full" type="submit">
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* LOGIN */}
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-8">
          <div className="max-w-sm text-center">
            <img src="/i.png" alt="illustration" className="w-full mb-6" />
            <h2 className="text-xl font-semibold">
              Connect with language partners worldwide
            </h2>
            <p className="opacity-70 mt-2">
              Practice conversations, make friends, and improve together
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;
  