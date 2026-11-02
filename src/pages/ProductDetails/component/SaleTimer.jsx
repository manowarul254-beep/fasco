import { useEffect, useState } from "react";

const pad = (n) => String(n).padStart(2, "0");

// ডেমো টাইমার: পেজ খোলার সময় থেকে উল্টো গোনে
const SaleTimer = ({ hours = 5, minutes = 59, seconds = 47 }) => {
  const [left, setLeft] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    const t = setInterval(() => setLeft((l) => (l > 0 ? l - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const parts = [
    Math.floor(left / 86400),
    Math.floor((left % 86400) / 3600),
    Math.floor((left % 3600) / 60),
    left % 60,
  ];

  return (
    <div className="flex items-center justify-between border border-red-200 bg-[#FFEDED] px-4 py-3 text-sm">
      <span className="font-heading font-bold text-[#E5484D]">
        Hurry up! Sale ends in:
      </span>
      <span className="flex items-center gap-2 font-medium text-[#E5484D]">
        {parts.map((p, i) => (
          <span key={i} className="flex items-center gap-2">
            {pad(p)}
            {i < parts.length - 1 && <span>:</span>}
          </span>
        ))}
      </span>
    </div>
  );
};

export default SaleTimer;