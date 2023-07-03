import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let generatedNumStore = JSON.parse(sessionStorage.getItem("randomNumber"));
  let allNumsStore = JSON.parse(sessionStorage.getItem("allNumsStorage"));
  const [generatedNum, setGeneratedNum] = useState(
    generatedNumStore ? generatedNumStore : []
  );
  const [allNums, setAllNums] = useState(allNumsStore ? allNumsStore : []);
  const getRandom = (max, memo) => {
    if (max != memo?.length) {
      const pos = Math.floor(Math.random() * max);
      if (memo?.includes(pos)) {
        return getRandom(max, memo);
      } else {
        return pos;
      }
    }
  };

  const restartGame = () => {
    sessionStorage.clear();
    const random = [];
    const range = 81;
    for (let index = 0; index < range; index++) {
      random.push(getRandom(range, random));
    }
    sessionStorage.setItem("allNumsStorage", JSON.stringify(random));
    setAllNums(random);
    setGeneratedNum([]);
  };

  useEffect(() => {
    const random = [];
    const range = 81;
    if (allNumsStore?.length === 0) {
      for (let index = 0; index < range; index++) {
        random.push(getRandom(range, random));
      }
      sessionStorage.setItem("allNumsStorage", JSON.stringify(random));
      setAllNums(random);
    } else {
      setAllNums(allNumsStore);
    }
  }, []);
  const generateRandomButton = () => {
    sessionStorage.setItem(
      "randomNumber",
      JSON.stringify([...generatedNum, getRandom(81)])
    );
    setGeneratedNum([...generatedNum, getRandom(81)]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}>
        <button
          style={{ border: "1px solid gray" }}
          onClick={() => generateRandomButton()}>
          Generate Random Number
        </button>
        <button
          style={{ border: "1px solid gray" }}
          onClick={() => restartGame()}>
          Start a New Game
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
        }}>
        Last Generated Numbers :{" "}
        {generatedNum[generatedNum?.length - 1] ? (
          generatedNum[generatedNum?.length - 1]
        ) : (
          <p style={{ color: "red" }}>Not Generated</p>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", maxWidth: "450px" }}>
        {allNums?.map((i, index) => {
          return (
            <div
              style={{
                backgroundColor: generatedNum.includes(i) ? "yellow" : null,
                userSelect: "none",
                height: "48px",
                width: "48px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid gray",
              }}
              key={index}>
              {i}
            </div>
          );
        })}
      </div>
      Created By: Yash Raj
    </div>
  );
}

export default App;
