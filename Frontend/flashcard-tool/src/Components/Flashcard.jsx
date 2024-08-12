import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../utilities/Constant";

const Flashcard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // State for dark mode

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(URL + "flashcards");
      const data = await response.json();
      console.log(data);
      setFlashcards(data);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  };

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const handlePrevious = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFlipped(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={
        darkMode
          ? "bg-gray-800 text-white h-[100vh]"
          : "bg-white text-black h-[100vh]"
      }
    >
      <div className="flex justify-between items-center px-4 py-2">
        <Link to="/admin">
          <button className="bg-green-600 rounded-md px-2 py-1 m-2 text-white">
            Admin
          </button>
        </Link>
        <button
          className="bg-gray-600 rounded-md px-2 py-1 m-2 text-white"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="flex justify-center items-center h-[90vh] flex-col no-select">
        {flashcards.length > 0 &&
          (!flipped ? (
            <div
              className={
                darkMode
                  ? "bg-gray-700 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
                  : "bg-gray-300 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
              }
              onClick={handleFlip}
            >
              <div>
                <h2 className="text-center font-bold p-4 text-xl">Question</h2>
                <div className="bg-black h-[2px]"></div>
              </div>
              <div className="w-full h-[70%] flex justify-center items-center">
                <p className="text-center justify-center font-semibold px-2">
                  {flashcards[currentCard].question}
                </p>
              </div>
              <div>
                <div className="bg-black h-[2px]"></div>
                <p className="text-center p-2 text-sm">Click to flip</p>
              </div>
            </div>
          ) : (
            <div
              className={
                darkMode
                  ? "bg-gray-700 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
                  : "bg-gray-300 w-[400px] h-[500px] rounded-md flex flex-col justify-between"
              }
              onClick={handleFlip}
            >
              <div>
                <h2 className="text-center font-bold p-4 text-xl">Answer</h2>
                <div className="bg-black h-[2px]"></div>
              </div>
              <div className="w-full h-[70%] flex justify-center items-center">
                <p className="text-center justify-center font-semibold px-2">
                  {flashcards[currentCard].answer}
                </p>
              </div>
              <div>
                <div className="bg-black h-[2px]"></div>
                <p className="text-center p-2 text-sm">Click to flip</p>
              </div>
            </div>
          ))}

        <div className="flex justify-between w-[300px] mt-2">
          <div>
            <button
              className="rounded-md bg-green-600 text-white px-2 py-1"
              onClick={handlePrevious}
              disabled={flashcards.length === 0}
            >
              Previous
            </button>
          </div>
          <div>
            <button
              className="rounded-md bg-green-600 text-white px-2 py-1"
              onClick={handleNext}
              disabled={flashcards.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
