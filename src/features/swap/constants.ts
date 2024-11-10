import { Token } from '@uniswap/sdk-core'


// Sepolia addresses
export const CBTC_ADDRESS = '0x52C369f5123dEF09825Ad006505B3C51AaAb3315' // Add your cBTC token address
export const UNISWAP_V2_PAIR_ADDRESS = '0x6EeA32D9c852f082a32A385Bd43C825C415cED3D' // Add your Uniswap V2 pair address
export const ROUTER_ADDRESS = '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3'
export const SEPOLIA_CHAIN_ID = 11155111

// Official Sepolia WETH address
export const WETH = new Token(
  SEPOLIA_CHAIN_ID,
  '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9', // Sepolia WETH
  18,
  'WETH',
  'Wrapped Ether'
)

export const CBTC = new Token(
  SEPOLIA_CHAIN_ID,
  CBTC_ADDRESS,
  18, // Changed to 18 decimals
  'cBTC',
  'Collateralized Bitcoin'
) 