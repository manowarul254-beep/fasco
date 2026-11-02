import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { SiGmail } from "react-icons/si";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import banner from "../../assets/banner.png";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Sign in:", form);
  navigate("/shop");
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
            <div className="mx-auto w-full max-w-[520px] lg:mx-0">
              <Link
                to="/"
                className="font-heading text-4xl font-bold text-muted lg:text-5xl"
              >
                FASCO
              </Link>

              <h1 className="mt-8 font-heading text-xl font-bold lg:mt-[4vh] lg:text-2xl">
                Sign In To FASCO
              </h1>

              {/* সোশ্যাল বাটন */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#4F6FE8] px-3 text-xs tracking-wide transition hover:bg-neutral-50"
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign in with Google
                </button>
                <button
                  type="button"
                  className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md border border-[#4F6FE8] px-3 text-xs tracking-wide transition hover:bg-neutral-50"
                >
                  <SiGmail className="h-5 w-5 text-red-500" />
                  Sign in with Email
                </button>
              </div>

              {/* OR বিভাজক */}
              <div className="my-6 flex items-center justify-center gap-3 text-xl font-bold text-neutral-500 lg:my-[3vh]">
                <span className="h-[3px] w-6 bg-neutral-500" />
                OR
                <span className="h-[3px] w-6 bg-neutral-500" />
              </div>

              {/* ফর্ম */}
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="h-11 w-full border-b border-neutral-500 bg-transparent text-sm tracking-wide outline-none placeholder:text-neutral-500"
                />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="mt-4 h-11 w-full border-b border-neutral-500 bg-transparent text-sm tracking-wide outline-none placeholder:text-neutral-500"
                />

                <Button
                  type="submit"
                  fullWidth
                  className="mt-6 h-12 rounded-lg text-sm font-semibold tracking-wider shadow-[0_15px_25px_rgba(0,0,0,0.2)]"
                >
                  Sign In
                </Button>

                <Button
                  as={Link}
                  to="/signup"
                  variant="outline"
                  fullWidth
                  className="mt-3 h-12 rounded-lg border-[#4F6FE8] text-sm font-semibold tracking-wider text-[#4F6FE8] hover:bg-[#4F6FE8]/5 hover:text-[#4F6FE8]"
                >
                  Register Now
                </Button>

                <div className="mt-3 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold tracking-wider text-[#4F6FE8] hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>
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

export default SignIn;