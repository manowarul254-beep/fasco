import { useState } from "react";
import Container from "../../components/ui/Container";
import SectionHeader from "../shared/Sectionheader";
import Button from "../../components/ui/Button";

import modelLeft from "../../assets/newsletter1.png";
import modelRight from "../../assets/newsletter2.png";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="overflow-hidden bg-white py-16 xl:py-0">
      <Container className="relative">
        {/* বাঁয়ের মডেল (শুধু বড় স্ক্রিনে) */}
        <img
          src={modelLeft}
          alt=""
          className="pointer-events-none absolute bottom-0 left-0 hidden h-full max-h-[750px] w-auto object-contain object-bottom xl:block"
        />

        {/* ডানের মডেল (শুধু বড় স্ক্রিনে) */}
        <img
          src={modelRight}
          alt=""
          className="pointer-events-none absolute bottom-0 right-0 hidden h-full max-h-[750px] w-auto object-contain object-bottom xl:block"
        />

        <div className="relative z-10 flex flex-col items-center justify-center xl:min-h-[750px]">
          <div className="w-full max-w-[630px]">
            <SectionHeader
              title="Subscribe To Our Newsletter"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin"
            />

            <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="michael@ymail.com"
                required
                className="h-[70px] w-full bg-white px-8 text-xl text-muted shadow-[0_20px_40px_rgba(0,0,0,0.06)] outline-none placeholder:text-neutral-500"
              />

              <Button
                type="submit"
                className="mt-8 h-14 rounded-lg px-11 shadow-[0_20px_30px_rgba(0,0,0,0.25)]"
              >
                Subscribe Now
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Subscribe;