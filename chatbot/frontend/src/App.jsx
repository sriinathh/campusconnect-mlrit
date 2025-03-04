import React from "react";
import Chat from "./components/Chat.jsx"; // Import Chat component

const App = () => {
  return (
    <div>
      <h1>Welcome to AI Chatbot</h1>
      <Chat /> {/* This renders Chat.jsx */}
    </div>
  );
};

export default App;
