import React from "react";
// import "./App.css";
// import ReactDOM from "react-dom";
import { Viewer } from "@grapecity/activereports-react";
import "@grapecity/activereports/pdfexport";
import "@grapecity/activereports/htmlexport";
import "@grapecity/activereports/tabulardataexport";
import { FontStore } from "@grapecity/activereports/core";

import axios from 'axios';
import { createRoot } from 'react-dom/client';

//조회
async function loadData() {
  const res = await axios.patch(process.env.REACT_APP_REST_SERVER, {
    p_lang: 'KO',
    p_plant: 'P500',
    p_rdc_code: 'ZT',
    p_user_id: 'A3',
    p_user_ip: '1.1.1.1',
    p_pgm: 'OtbOrdCnfRepBill.rdlx-json',
    p_proc: 'SP_W_OTB_ORD04_S04',
    p_case: 'SELECT',
    p_option: {
      ORDNO:"2024121300002"
      // , WHOUSE:"10"
      }
  });

  console.log('res.data.rows', res.data.rows);
  return res.data.rows;
  // console.log(res.data);
}


async function loadReport() {
  // load report definition from the file
  const reportResponse = await fetch(
    "rep/OtbOrdCnfRepBill.rdlx-json"
    // "/activereportsjs/demos/resource/reports/CustomersTable.rdlx-json"
  );
  const report = await reportResponse.json();
  // console.log('loadReport() report', report);
  return report;
}

function InbOrdPltLstRep() {
  const viewerRef = React.useRef();
  React.useEffect(() => {
    async function openReport() {
      const data   = await loadData();
      const report = await loadReport();

      // console.log('App() report', report);

      // console.log('App() report.DataSources[0].ConnectionProperties.ConnectString', report.DataSources[0].ConnectionProperties.ConnectString);
      // console.log('App() JSON.stringify(data)', JSON.stringify(data));

      // console.log('report.DataSources[0].ConnectionProperties.ConnectString', report.DataSources[0].ConnectionProperties.ConnectString);
      // console.log('"jsondata=" + JSON.stringify(data)', "jsondata=" + JSON.stringify(data));

      report.DataSources[0].ConnectionProperties.ConnectString = "jsondata=" + JSON.stringify(data);

      // console.log('loadReport() viewerRef.current.Viewer.open(report)', viewerRef.current.Viewer.open(report));

     viewerRef.current.Viewer.open(report);
    }
    openReport();
  }, []);

  return (
    <div id="viewer-host">
      <Viewer ref={viewerRef} />
    </div>
  );
}

FontStore.registerFonts("/activereportsjs/demos/resource/fontsConfig.json");
// ReactDOM.render(<App />, document.getElementById("root"));

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);
root.render(<InbOrdPltLstRep />);

export default InbOrdPltLstRep;
// 