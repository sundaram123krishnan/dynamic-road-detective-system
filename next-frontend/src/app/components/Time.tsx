"use client";

import { useState, useEffect } from "react";
import React from "react";
export default function Time() {
  const [currentTime, setCurrentTime] = useState(new Date());
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const formattedTime = currentTime.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return <div className="font-bold text-center text-lg">{formattedTime}</div>;
}
