import { getPools } from "../repos/uniswap";

describe('getPoolsList', () => {
        it('should return the 10 biggest Uniswap V3 Pools sorted by totalValueLockedETH', async () => {
            const poolsList = await getPools()
            expect(poolsList.length).toBe(10)
        })
    })