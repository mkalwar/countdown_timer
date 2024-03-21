import React, { useEffect, useState } from "react";
import styles from "./CountdownTimer.module.css";

const CountdownTimer = ({ targetDate, setTargetDate }) => {
  const [timeLeft, setTimeleft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timer, setTimer] = useState(false);
  const [timerButtonText, setTimerButtonText] = useState("Start Timer");
  const [timeUp, setTimeUp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;

    const calculateTimeElpse = () => {
      const difference = new Date(targetDate) - new Date();
      if (difference > 0) {
        let secondsLeft = Math.floor(difference / 1000);
        const days = Math.floor(secondsLeft / (3600 * 24));
        secondsLeft %= 3600 * 24;
        const hours = Math.floor(secondsLeft / 3600);
        secondsLeft %= 3600;
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft % 60;

        return { days, hours, minutes, seconds };
      } else {
        setTimer(false);
        setTimeUp(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    if (timer) {
      interval = setInterval(() => {
        setTimeleft(calculateTimeElpse());
      }, 1000);
      setTimerButtonText("Cancel Timer");
    } else {
      setTimerButtonText("Start Timer");
    }

    return () => clearInterval(interval);
  }, [targetDate, timer]);

  useEffect(() => {
    setTimeUp(false);
  }, [targetDate]);

  useEffect(() => {
    if (timeUp) {
      setError("Your countdown timer is over!");
      setTimer(false);
      setTimerButtonText("Start timer");
      setTimeleft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTargetDate("");
    }
  }, [timeUp]);

  const handleToggleButton = () => {
    if (timer) {
      setTimer(false);
      setTimerButtonText("Start Timer");
      setTimeleft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTargetDate("");
    } else {
      const calculateDaysDifference =
        (new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24);
      if (calculateDaysDifference > 100) {
        setError("Selected days are more then 100 days.");
      } else {
        setTimer(true);
        setError("");
        setTimerButtonText("Cancel Timer");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>
        Countdown <span>Timer</span>
      </h1>
      <div>
        <input
          className={styles.targetDate}
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
      </div>
      <div>
        <button
          className={`${styles.timerButton} ${
            targetDate ? "" : styles.disabled
          }`}
          onClick={handleToggleButton}
          disabled={!targetDate}
        >
          {timerButtonText}
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {timeUp && (
        <div className={styles.error}>Your countdown timer is over!</div>
      )}

      {!error && !timeUp && timer && (
        <div className={styles.counterSection}>
          <div className={styles.card}>
            <span className={styles.cardCount}>{timeLeft.days}</span>
            <span className={styles.cardText}>Days</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardCount}>{timeLeft.hours}</span>
            <span className={styles.cardText}>Hours</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardCount}>{timeLeft.minutes}</span>
            <span className={styles.cardText}>Minutes</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardCount}>{timeLeft.seconds}</span>
            <span className={styles.cardText}>Seconds</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
