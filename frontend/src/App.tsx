import React from 'react';
import {Container} from "react-bootstrap";
import Header from "./components/Header";
import Menu from "./pages/Menu";
import {Route, Routes} from "react-router-dom";
import Vote from "./pages/Vote";
import Results from "./pages/Results";

function App() {
  return (
      <div className="App">
        <Header/>
        <main>
          <Container className="d-flex flex-column align-items-center py-5">
            <Routes>
              <Route path="/vote" element={<Vote/>}/>
              <Route path="/results" element={<Results/>}/>
              <Route path="*" element={<Menu/>}/>
            </Routes>
          </Container>
        </main>
      </div>
  );
}

export default App;
