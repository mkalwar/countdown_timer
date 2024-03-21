import React, { useState } from "react";
import CountdownTimer from "./components/countdownTimer/CountdownTimer";

function App() {
  const [targetDate, setTargetDate] = useState("");
  return (
    <div>
      <CountdownTimer targetDate={targetDate} setTargetDate={setTargetDate} />
    </div>
  );
}

export default App;
