import './App.css';
import React, {useState} from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import csvfile from "./covid19vaccinesbycounty.csv"



function downloadURI(uri) {
  fetch("/fetchCsv");
}

function App() {
  
  const [content,setContent] = useState("");
    return (
      <div>
        <h1 style={{alignItems:"center"}}>California vaccination data</h1>
        <button className="button" onClick={()=>downloadURI()}>Refresh Data</button>
        <MapChart setTooltipContent={setContent} csvfile={csvfile}/>
        <ReactTooltip multiline={true} className="tooltip">{content}</ReactTooltip>
      </div>
    );
}
 
export default App;
