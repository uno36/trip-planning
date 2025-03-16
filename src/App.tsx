import React from "react";
import InputForm from "./components/InputForm";
import Header from "./components/Header";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <InputForm />
    </div>
  );
};

export default App;
