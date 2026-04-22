import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: 0,
            border: "1px solid #050505",
            background: "#ffffff",
            color: "#050505",
            fontFamily: "IBM Plex Sans, sans-serif",
            boxShadow: "6px 6px 0 0 #050505",
          },
        }}
      />
    </div>
  );
}

export default App;
