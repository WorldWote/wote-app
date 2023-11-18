import React from 'react';
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import {Route, Routes} from "react-router-dom";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import { useAccount } from "wagmi";

function App() {
  const {isConnected} = useAccount()
  return (
      <div className="App">
        <Header/>
        <main>
          <Container className="d-flex flex-column align-items-center py-5">
            {
              isConnected ? (
                <Routes>
                  <Route path="/vote" element={<Vote/>}/>
                  <Route path="/results" element={<Results/>}/>
                  <Route path="*" element={<Menu/>}/>
                </Routes>
              ) : (
                <w3m-button/>
              )
            }
          </Container>
        </main>
      </div>
  );
}

export default App;
