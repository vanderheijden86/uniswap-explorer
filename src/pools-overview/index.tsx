import usePoolsOverview from "../hooks/usePoolsOverview";
import Table from "react-bootstrap/Table";
import "./index.css";
import NumberFormat from 'react-number-format';

function PoolsOverview() {
  const pools = usePoolsOverview();

  return (
    <Table responsive size="sm" variant="dark" striped>
      <thead>
      <tr>
        <th>Address</th>
        <th>Token0</th>
        <th>Token1</th>
        <th>Fee tier</th>
        {/*<th>Liquidity</th>*/}
        <th>Token0 Price</th>
        <th>Token1 price</th>
        <th>Volume in USD</th>
        <th>TVL in ETH</th>
        <th>TVL in USD</th>
      </tr>
      </thead>
      <tbody>
      {pools.map((pool, key) => {
        return (
          <tr key={key}>
            <td>{pool.id}</td>
            <td>{pool.token0.name}</td>
            <td>{pool.token1.name}</td>
            <td>{pool.feeTier}</td>
            {/*<td>{pool.liquidity}</td>*/}
            <td><NumberFormat value={pool.token0Price} thousandSeparator={true} prefix={''} decimalScale={2} displayType="text"/></td>
            <td><NumberFormat value={pool.token1Price} thousandSeparator={true} prefix={''} decimalScale={2} displayType="text"/></td>
            <td><NumberFormat value={pool.volumeUSD.toString()} thousandSeparator={true} prefix={'$'} decimalScale={0} displayType="text"/></td>
            <td><NumberFormat value={pool.totalValueLockedETH.toString()} thousandSeparator={true} prefix={''} decimalScale={0} displayType="text"/></td>
            <td><NumberFormat value={pool.totalValueLockedUSD.toString()} thousandSeparator={true} prefix={'$'} decimalScale={0} displayType="text"/></td>
          </tr>
        );
      })}
      </tbody>
    </Table>
  );
}

export default PoolsOverview;