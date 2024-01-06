"use client";
import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import ReactSpeedometer from "react-d3-speedometer";

const VehicleCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [objType, setObjType] = useState<string>("");
  const [speed, setSpeed] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const socket = io("127.0.0.1:5000");

    socket.on(
      "new_detection",
      (data: { count: number; object_type: string }) => {
        console.log("New detection:", data);
        setCount(data.count);
        setObjType(data.object_type);
        setShowAlert(true);

        speakObjectType(data.object_type);
      },
    );

    socket.on("vehicle_speed", (data: { speed: number }) => {
      console.log("Vehicle speed:", data);
      setSpeed(data.speed);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const speakObjectType = (type: string) => {
    if ("speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(
        `Caution! ${type} detected.`,
      );
      synth.speak(utterance);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [showAlert]);

  const renderIcon = () => {
    // You can customize this function to render icons based on your preference
    //
    return null;
  };

  return (
    <div style={{ margin: "auto", padding: "20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Total Count of objects: {count}
      </h1>
      {showAlert && (
        <div
          style={{
            margin: "10px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {renderIcon()}
          <div>
            <div
              style={{ fontWeight: "bold" }}
            >{`New detection: ${objType} incoming`}</div>
            {(objType === "car" ||
              objType === "bus" ||
              objType === "motorcycle") &&
              speed !== null && (
                <div>
                  <p style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    Vehicle Speed: {speed.toFixed(2)} meters/second
                  </p>
                  <ReactSpeedometer
                    maxValue={140}
                    value={speed}
                    needleColor="blue"
                    startColor="green"
                    segments={10}
                    endColor="red"
                  />
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleCounter;
