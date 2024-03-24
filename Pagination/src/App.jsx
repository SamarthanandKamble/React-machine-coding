import { useState } from "react";

import "./App.css";
import Pages from "./components/Pages";
import useGetData from "./Hooks/useGetData";

function App() {
  return (
    <>
      <h1>Pagination</h1>
      <Pages />
    </>
  );
}

export default App;
