import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Menu from './pages/Menu';
import { Route, Routes } from 'react-router-dom';
import Vote from './pages/Vote';
import Results from './pages/Results';
import { useAccount, useNetwork } from 'wagmi';
import { DEFAULT_CHAIN } from './settings';
import Dev from './pages/dev';

function App() {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const isWrongNetwork = chain?.id !== DEFAULT_CHAIN.id;
  return (
    <div className="App">
      <Header />
      <main>
        <Container className="d-flex flex-column align-items-center py-5">
          {isConnected ? (
            isWrongNetwork ? (
              <div className="text-center">
                <h4>Wrong network</h4>
                <p>Please switch to {DEFAULT_CHAIN.name}</p>
              </div>
            ) : (
              <Routes>
                <Route path="/vote" element={<Vote />} />
                <Route path="/results" element={<Results />} />
                <Route path="/dev" element={<Dev />} />
                <Route path="*" element={<Menu />} />
              </Routes>
            )
          ) : (
            <w3m-button />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
