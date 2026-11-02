import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import banner from "../../assets/banner.png";

const inputClass =
  "h-11 w-full border-b border-neutral-500 bg-transparent text-sm tracking-wide outline-none placeholder:text-neutral-500";

const NewPassword = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    console.log("New password:", form.password);
    navigate("/signup");
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

              <h1 className="mt-10 font-heading text-xl font-bold lg:mt-[20vh] lg:text-2xl">
                Enter Your New Password
              </h1>

              <form onSubmit={handleSubmit} className="mt-10">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="New Password"
                  required
                  minLength={6}
                  className={inputClass}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirmation Password"
                  required
                  className={`${inputClass} mt-6`}
                />

                {error && (
                  <p className="mt-3 text-sm text-red-500">{error}</p>
                )}

                <Button
                  type="submit"
                  fullWidth
                  className="mt-8 h-12 rounded-lg bg-[#5A85E6] text-sm font-semibold hover:bg-[#4a75d6]"
                >
                  Submit
                </Button>
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

export default NewPassword;