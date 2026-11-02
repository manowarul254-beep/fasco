import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import banner from "../../assets/signup1.png";

const inputClass =
  "h-11 w-full border-b border-neutral-500 bg-transparent text-sm tracking-wide outline-none placeholder:text-neutral-500";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    shortName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up:", form);
    navigate("/signin");
  };

  return (
    <section className="bg-white lg:h-screen lg:overflow-hidden">
      <Container className="lg:h-full">
        <div className="grid lg:h-full lg:grid-cols-2">
          {/* বাঁয়ের ছবি */}
          <div className="relative hidden min-w-0 lg:block">
            <img
              src={banner}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* ডানের ফর্ম */}
          <div className="flex min-w-0 flex-col justify-between px-2 py-6 lg:pl-10 lg:pr-0 xl:pl-14">
            <div className="mx-auto w-full max-w-[560px] lg:mx-0">
              <Link
                to="/"
                className="font-heading text-4xl font-bold text-muted lg:text-5xl"
              >
                FASCO
              </Link>

              <h1 className="mt-10 font-heading text-xl font-bold lg:mt-[12vh] lg:text-2xl">
                Create Your FASCO Account
              </h1>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className={inputClass}
                  />
                  <input
                    type="text"
                    name="shortName"
                    value={form.shortName}
                    onChange={handleChange}
                    placeholder="Short Name"
                    required
                    className={inputClass}
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    className={inputClass}
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    minLength={6}
                    className={inputClass}
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  className="mt-8 h-12 rounded-lg text-sm font-semibold shadow-[0_15px_25px_rgba(0,0,0,0.2)]"
                >
                  Sign Up
                </Button>

                <p className="mt-4 text-center text-sm tracking-wide">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-[#4F6FE8] hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>

            <p className="mt-6 text-right text-xs">
              FASCO Terms &amp; Codnitions
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SignUp;