import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import PoolsOverview from "./components/PoolsOverview";
import { Web3ReactProvider } from "@web3-react/core";
import Account from "./components/Web3Account";
import useEagerConnect from "./hooks/useEagerConnect";
import getLibrary from "./utils/getLibrary";
import EthBalance from "./components/EthBalance";

function App() {
  const triedToEagerConnect = useEagerConnect();

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Container fluid>
        <Row>
          <Col>
            <Account triedToEagerConnect={triedToEagerConnect} />
          </Col>
          <Col>
            <EthBalance />
          </Col>
        </Row>
        <PoolsOverview />
      </Container>
    </Web3ReactProvider>
  );
}

export default App;