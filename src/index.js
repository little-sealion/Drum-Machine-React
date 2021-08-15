import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


//define the KeyBoard component (toppest component)
function KeyBoard(){
  const [power, setPower] = useState(false);
  const [display,setDisplay] = useState("");
  const [volume,setVolume] =useState(30);
  const [bank, setBank] = useState(false);
  let onPower = (status) => {
    setPower(status);
    if(!status){
      setDisplay('');
      setBank(false);
    }
  
  }
  let onDisplay = (text) => setDisplay(text);
  let onBank = (bank) => {
    setBank(bank);
    let bankChoosed = bank?"Smooth Piano Kit":"Heater Kit";
    setDisplay(bankChoosed);
  };
  let onVolume = (vol) => {
    setVolume(vol);
    setDisplay(`Volume ${vol}`);
  }



  return (
    <div className = "w-120 h-96 border-4 m-6 p-2">
      <h1 className="font-serif text-center text-4xl m-4">Tess's Keyboard</h1>
      <div className="flex ">

        <KeyPad power={power} volume={volume} bank={bank} onDisplay={onDisplay} />
        <ControlPanel
          power={power} onPower={onPower}
          display={display} onDisplay={onDisplay}
          bank={bank} onBank={onBank}
          volume={volume} onVolume={onVolume}
        />
      </div>
    </div>

  )
}

function ControlPanel(props){
  return(
    <div id="control-panel" className="inline-block w-1/3 m-4">
      <Power power={props.power} onPower={props.onPower}  />
      <Display power={props.power} display={props.display} />
      <Volume power={props.power} volume={props.volume} onVolume={props.onVolume} />
      <Bank power={props.power} bank={props.bank} onBank={props.onBank} />
    </div>
  )
}

function Power(props) {
  return (
    <div className="mb-4">
      <i>Power</i>
      <label className="switch">
        <input type="checkbox" checked={props.power} onChange={(e) => props.onPower(e.target.checked)} />
        <span className="slider round"></span>
      </label>
    </div>
  )
}
function Display(props){
 return(
   <div id="display" className="w-4/5 h-1/4 bg-purple-400 text-center pt-4 mb-4 rounded-sm">{props.display}</div>
 )
}
function Volume(props){
 return(
  <div>
  <input type="range" id="volume" name="volume"
         min="0" max="100" disabled={!props.power} value={props.volume} onChange={(e) => props.onVolume(e.target.value)} />
  <label htmlFor="volume">Volume</label>
  </div>
 )
}
function Bank(props){
  return(
    <div className="mt-4" >
      <i>Bank</i>
      <label className="switch">
        <input type="checkbox" disabled={!props.power} checked={props.bank} onChange={(e) => props.onBank(e.target.checked)} />
        <span className="slider round"></span>
      </label>
    </div>
  )
 }
function KeyPad(props){
  return(
    <div className="w-2/3 h-full inline-block ">
      <div className="w-4/5 h-1/4 m-2 " >
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="Q" />
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="W" />
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="E" />
      </div>
      <div className="w-4/5 h-1/4 m-2 " >
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="A" />
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="S" />
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="D" />
      </div>
      <div className="w-4/5 h-1/4 m-2 " >
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="Z" />
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="X" />
        <Key power={props.power} vol={props.volume} bank={props.bank} onDisplay={props.onDisplay} tone="C" />
      </div>
    </div>
  )
}

function Key(props){
  const HeaterStrings = {
    "Q": "Heater-1",
    "W": "Heater-2",
    "E": "Heater-3",
    "A": "Heater-4_1",
    "S": "Heater-6",
    "D": "Dsc_Oh",
    "Z": "Kick_n_Hat",
    "X": "RP4_KICK_1",
    "C": "Cev_H2",
  }
  const PianoStrings = {
    "Q": "Chord_1",
    "W": "Chord_2",
    "E": "Chord_3",
    "A": "Give_us_a_light",
    "S": "Dry_Ohh",
    "D": "Bld_H1",
    "Z": "punchy_kick_1",
    "X": "side_stick_1",
    "C": "Brk_Snr",
  }

  function play(props) {
    // console.log(props.vol);
    let clip = props.bank? PianoStrings[props.tone]:HeaterStrings[props.tone];
    props.onDisplay(clip);
    let audio = new Audio(`https://s3.amazonaws.com/freecodecamp/drums/${clip}.mp3`);
    audio.volume = Number(props.vol/100); // volume value should be set between 0 - 1
    audio.play();
  }

  return(
      <input className="w-1/4 h-full m-2 p-4 inline-block rounded-full bg-yellow-200 " type="button" disabled={!props.power} value={props.tone} onClick={() => play(props)} />
  )
}

ReactDOM.render(

    <KeyBoard />,
  document.getElementById('root')
);


