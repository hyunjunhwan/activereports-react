import React from 'react';
import "./App.css";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";
import OtbOrdCnfRep from "./rep/OtbOrdCnfRep.js";




const App = () => {

  let SelectRep = OtbOrdCnfRep;
  
  return (
    <>
        <SelectRep/>
    </>
  );
}

export default App;
