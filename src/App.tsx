import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import PoolsOverview from "./components/PoolsOverview";
import { Web3ReactProvider } from "@web3-react/core";
import Account from "./components/Web3Account";
import useEagerConnect from "./hooks/useEagerConnect";
import getLibrary from "./utils/getLibrary";

function App() {
  const triedToEagerConnect = useEagerConnect();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container fluid>
        <Account triedToEagerConnect={triedToEagerConnect} />
        <PoolsOverview />
      </Container>
    </Web3ReactProvider>
  );
}

export default App;