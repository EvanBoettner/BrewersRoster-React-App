import { useEffect, useState } from "react";
import data from "./data.json"; // Grabs the data from the local file
import "./App.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GiBaseballBat, GiBaseballGlove } from "react-icons/gi";
import { IoBaseball } from "react-icons/io5";
import { RiShirtFill } from "react-icons/ri";
import logo from './SVG-brewers.svg';

function App() {
  const [players, setPlayers] = useState([]); // to hold the data

  useEffect(() => {
    setPlayers(data); // stores the data from the json file in state
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 450;    //Slider for desktop viewers, slides left
  };
  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 450;   //Slider for desktop viewers, slides right
  };

  const logoStyle = {
    width: "200px",
    position: "absolute",
    top: '0',
    left: '0',
    backgroundImage: `url(${logo})`,
    height: '200px'
  }

  return (
    <div className="rosterPage">
      <br /> <br />
      <div className="pageTitle">
        <h1>2022 Brewers Roster</h1>
      </div>
      <br />
      <br />
      <div id="rosterSlider">
        <div id="players" className="flex">
          <AiOutlineArrowLeft onClick={slideLeft} className="Arrow arrowMobile" />
          <div id="slider" className="flex container containerMobile">
            {players.map((player) => { //Since the data is an array of objects Im displaying them with the .map function
              return (
                <div
                  key={player.id}
                  className="player"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(`${player.id}`)
                      .classList.toggle("info");  // Toggles a class that changes the display from none to block so you can view the content
                  }}
                >
                  <h1 className="playerName">
                    {player.firstName} {player.lastName}
                  </h1>
                  <h4>PlayerID: {player.id}</h4>
                  <img
                    className="baseballImg"
                    alt="player"
                    src={player.picture}
                  />{" "}
                  <br />
                  <div id={player.id} className="noInfo">
                    <h4 className="position">
                      <GiBaseballGlove size={20} /> Position:{" "}
                      {player.primaryPosition}
                    </h4>
                    <h4 className="bat">
                      <GiBaseballBat size={20} /> Bat Side: {player.batSide}
                    </h4>
                    <h4 className="throw">
                      <IoBaseball size={20} /> Throw Side: {player.throwSide}
                    </h4>
                    <h4 className="number">
                      <RiShirtFill size={20} /> Number: {player.number}
                    </h4>
                    <h4 className="birth">
                      Birth Place: {player.birthCity},{" "}
                      {player.birthStateProvince}, <br /> {player.birthCountry}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
          <AiOutlineArrowRight onClick={slideRight} className="Arrow arrowMobile" />
        </div>
      </div>
      <div className="logo" style={logoStyle}></div>
    </div>
  );
}

export default App;
