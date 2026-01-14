"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getTimeRemaining } from "../helper";

const TimeBox = ({ label, value }: { label: string; value: number }) => (
  <div className="text-center">
    <div className="font-bold text-7xl">{String(value).padStart(2, "0")}</div>
    <small>{label}</small>
  </div>
);

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    difference: number;
  } | null>(null);
  const [targetDate, setTargetDate] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!timeLeft || !timeLeft.difference) {
    return (
      <div className="p-4 w-50">
        <p className="text-xs mb-4">Select a target date</p>
        <input
          type="date"
          value={targetDate}
          className="min-w-10 border border-solid border-black/40 text-xs rounded p-3"
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </div>
    );
  }

  if (timeLeft?.difference <= 0) {
    return (
      <p className="p-11 mt-10 font-bold text-7xl text-center">Launched 🎉</p>
    );
  }

  const onSubscribe = () => {
    if (!email) alert("Enter your email!");
    console.log(email);
    setEmail("");
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row gap-10">
        <TimeBox label="Days" value={timeLeft.days} />
        <TimeBox label="Hours" value={timeLeft.hours} />
        <TimeBox label="Minutes" value={timeLeft.minutes} />
        <TimeBox label="Seconds" value={timeLeft.seconds} />
      </div>
      <div className="flex flex-row items-center gap-4 mt-10">
        <input
          type="email"
          value={email}
          className="min-w-10 border border-solid border-black/40 text-xs rounded p-3"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={onSubscribe} className="cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
}
