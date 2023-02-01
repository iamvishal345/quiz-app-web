const calculatePosition = (timeLeft, totalTime) => {
  const rawTimeFraction = timeLeft / totalTime;
  return rawTimeFraction - (1 / totalTime) * (1 - rawTimeFraction);
};

export const Timer = ({ timeLeft, totalTime }) => {
  const getColor = (timeLeft) => {
    if (timeLeft < 10) return "red";
    if (timeLeft < 20) return "orange";
    return "green";
  };

  return (
    <div class="base-timer">
      <svg
        class="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class="base-timer__circle">
          <circle
            class="base-timer__path-elapsed"
            cx="50"
            cy="50"
            r="45"
          ></circle>
          <path
            id="base-timer-path-remaining"
            stroke-dasharray={`${(
              calculatePosition(timeLeft, totalTime) * 283
            ).toFixed(0)} 283`}
            class={`base-timer__path-remaining ${getColor(timeLeft)}`}
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        {timeLeft.toString().padStart("2", "0")}
      </span>
    </div>
  );
};
