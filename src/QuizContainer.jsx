import { useEffect, useRef, useState } from "react";
import questionsList from "./Quiz.json";
import { ReactComponent as World } from "./world.svg";
import { ReactComponent as Winner } from "./winner.svg";
import { Timer } from "./Timer";

const OPTION_LABEL_LIST = ["A", "B", "C", "D"];
export const QuizContainer = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const score = useRef(0);
  const [showResult, setShowResult] = useState(true);
  const [optionError, setOptionError] = useState(-1);
  const [optionSuccess, setOptionSuccess] = useState(-1);
  const intervalRef = useRef(null);

  const handleOptionClick = (i) => {
    const answerIndex = questionsList[currentQuestionIndex].correctIndex;
    if (answerIndex === i) {
      score.current += 1;
    } else {
      setOptionError(i);
    }
    setOptionSuccess(answerIndex);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeout(() => {
      setOptionError(-1);
      setOptionSuccess(-1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 2000);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setCurrentQuestionIndex(
        (currentQuestionIndex) => currentQuestionIndex + 1
      );
    }
  }, [timeLeft]);

  const resetGame = () => {
    score.current = 0;
    setCurrentQuestionIndex(0);
    setShowResult(false);
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (currentQuestionIndex === questionsList.length - 1) {
      setShowResult(true);
      return;
    }
    setTimeLeft(30);
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [currentQuestionIndex]);

  if (showResult) {
    return (
      <div style={{ marginTop: "4rem" }}>
        <header className="header">Country Quiz</header>

        <div className="result-container">
          <Winner />
          <h1>Results</h1>
          <p className="result-label">
            You got <span className="result-score">{score.current}</span>{" "}
            correct answers
          </p>
          <button onClick={resetGame} className="result-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="question-container">
      <div className="header-container">
        <header className="header">Country Quiz</header>
        <World />
      </div>
      <div className="question">
        <div className="question-label">
          {questionsList[currentQuestionIndex].question}
        </div>
        <div
          className={`options-container ${
            optionError > -1 || optionSuccess > -1 ? "disable" : ""
          }`}
        >
          {questionsList[currentQuestionIndex].answers.map((option, i) => (
            <button
              className={`option ${optionError === i ? "error" : ""} ${
                optionSuccess === i ? "success" : ""
              }`}
              key={i}
              type="button"
              onClick={() => handleOptionClick(i)}
            >
              <span>{OPTION_LABEL_LIST[i]}</span>
              <span style={{ margin: "auto" }}>{option}</span>
            </button>
          ))}
        </div>
        <div className="top-bar">
          <h2 className="question-number">
            {currentQuestionIndex + 1}/{questionsList.length - 1}
          </h2>
          <h2 className="time-left">
            <Timer timeLeft={timeLeft} totalTime={30} />
          </h2>
        </div>
      </div>
    </div>
  );
};
