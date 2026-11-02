import { useEffect, useState } from "react";

// বাকি সময় বের করে (target = মিলিসেকেন্ডে শেষ হওয়ার সময়)
const calc = (target) => {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

/**
 * useCountdown: প্রতি সেকেন্ডে আপডেট হওয়া কাউন্টডাউন
 * ব্যবহার: const { days, hours, minutes, seconds } = useCountdown(targetMs);
 */
export default function useCountdown(target) {
  const [time, setTime] = useState(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setTime(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}