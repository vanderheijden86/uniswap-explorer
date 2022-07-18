import { getPools } from "../repos/uniswap";
import { BigNumber, utils } from "ethers";
import useQuoteExactInputSingle from "../hooks/uniswap/useQuoteExactInputSingle";
import { renderHook } from "@testing-library/react";
import { JsonRpcProvider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { abi as IQuoter_ABI } from "../../artifacts/contracts/IQuoter.sol/IQuoter.json";
import { abi as IUniswapV3Pool_ABI } from "../../artifacts/contracts/IUniswapV3Pool.sol/IUniswapV3Pool.json";

describe("getPoolsList", () => {
  it("should return the 10 biggest Uniswap V3 Pools sorted by totalValueLockedETH", async () => {
    const poolsList = await getPools();
    expect(poolsList.length).toBe(10);
  });
});

describe("uniswap tests", () => {
  // TODO: Run hardhat node programmatically before tests start
  jest.setTimeout(60_000);
  test("should give a quote for a certain trade", async () => {
    const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"; // Mainnet quoter address
    const poolAddress = "0x5777d92f208679db4b9778590fa3cab3ac9e2168"; // Dai Stablecoin <-->	USD Coin
    // translate 100 dollar to DAI Stablecoin's 18 decimals
    const amountIn = utils.parseUnits("100", 18);

    const provider = new JsonRpcProvider(); // connect to default network, which is localhost:8545 where hardhat node runs
    const poolContract = new Contract(poolAddress, IUniswapV3Pool_ABI, provider);
    const quoterContract = new Contract(quoterAddress, IQuoter_ABI, provider);

    const { result } = renderHook(() => useQuoteExactInputSingle(poolContract, quoterContract, amountIn, 0));
    const quote = await result.current as BigNumber;

    // translate result into USD Coin's 6 decimals
    const formattedQuote = utils.formatUnits(quote, 6);

    expect(formattedQuote).not.toBe(null);
    console.log(formattedQuote);
  });
});