import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/ui/Container";
import Button from "../../components/ui/Button";

import banner from "../../assets/banner.png";

const ConfirmationCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    console.log("Recover account with code:", code);
    navigate("/new-password");
  };

  const handleResend = () => {
    console.log("Resend confirmation code");
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
                Enter The Confirmation Code
              </h1>

              <form onSubmit={handleSubmit} className="mt-10">
                <input
                  type="text"
                  inputMode="numeric"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Confirmation Code"
                  required
                  className="h-11 w-full border-b border-neutral-500 bg-transparent text-sm tracking-wide outline-none placeholder:text-neutral-500"
                />

                <Button
                  type="submit"
                  fullWidth
                  className="mt-8 h-12 rounded-lg text-sm font-semibold shadow-[0_15px_25px_rgba(0,0,0,0.2)]"
                >
                  Recover Account
                </Button>

                <p className="mt-4 text-center text-sm tracking-wide">
                  Didn’t receive Confirmation Code?{" "}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="cursor-pointer font-bold text-[#4F6FE8] hover:underline"
                  >
                    Resend Now
                  </button>
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

export default ConfirmationCode;