import React, { useState, useEffect } from 'react';

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once

  // Format the time as per your requirement
  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
  });

  return (
    <div className="text-lg font-bold" style={{ whiteSpace: 'nowrap' }}>
      Time: {formattedTime}
    </div>
  );
};

export default LiveClock;
