import "./App.css";
import React, { useEffect, useState } from "react";

const audioArray = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function App() {
  const [volume, setVolume] = useState(0.5);
  const [current, setCurrent] = useState("23432");
  return (
    <div className="center" id="drum-machine">
      <h2>Drum Machine</h2>
      <h5>by Carlos Planchart </h5>
      <div className="row">
        {audioArray.map((clip) => {
          return (
            <Pad
              key={clip.div}
              clip={clip}
              volume={volume}
              setCurrent={setCurrent}
              setVolume={setVolume}
            />
          );
        })}
      </div>
      <div className="attributes">
        <h2>Volume</h2>
        <input
          type="range"
          id="vol"
          onChange={(e) => {
            setVolume(e.target.value);
            setCurrent(`Volume : ${volume}`);
          }}
          value={volume}
          name="vol"
          min="0"
          max="1"
          step="0.01"
        ></input>
        <h4 id="display">{current}</h4>
      </div>
    </div>
  );
}

function Pad({ clip, volume, current, setCurrent, setVolume }) {
  const [active, setActive] = useState(false);

  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger);
    audioTag.currentTime = 0;
    audioTag.play();
    audioTag.volume = volume;
    current = clip.id;
    setCurrent(current);
    setActive(true);
    setTimeout(() => setActive(false), 200);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div
      className={active ? "activate drum-pad" : "drum-pad normal"}
      onClick={playSound}
      size="lg"
      variant="secondary"
      id={clip.id}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

export default App;
