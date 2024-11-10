import { TokenStandard, WarpCoreConfig } from '@hyperlane-xyz/sdk';
// tokens:
// - chainName: basesepolia
//   standard: EvmHypSynthetic
//   decimals: 18
//   symbol: cBTC
//   name: Citrea BTC
//   addressOrDenom: "0x4aCa973F6b9a52981e63B59e9aa51d15372eB89e"
//   connections:
//     - token: ethereum|citreatestnet|0x0209791Cf7eDBfCe09AFf7cf7b03fB1c80dD1F9b
// - chainName: citreatestnet
//   standard: EvmHypNative
//   decimals: 18
//   symbol: cBTC
//   name: Citrea BTC
//   addressOrDenom: "0x0209791Cf7eDBfCe09AFf7cf7b03fB1c80dD1F9b"
//   connections:
//     - token: ethereum|basesepolia|0x4aCa973F6b9a52981e63B59e9aa51d15372eB89e
// A list of Warp Route token configs
// These configs will be merged with the warp routes in the configured registry
// The input here is typically the output of the Hyperlane CLI warp deploy command
export const warpRouteConfigs: WarpCoreConfig = {
  tokens: [
    // {
    //   // The ChainName of the token
    //   chainName: 'basesepolia',
    //   // See https://github.com/hyperlane-xyz/hyperlane-monorepo/blob/main/typescript/sdk/src/token/TokenStandard.ts
    //   standard: TokenStandard.EvmHypSynthetic,
    //   // The token metadata (decimals, symbol, name)
    //   decimals: 18,
    //   symbol: "cBTC",
    //   name: "Citrea BTC",
    //   // The router address
    //   addressOrDenom: "0x4aCa973F6b9a52981e63B59e9aa51d15372eB89e",
    //   // The address of the underlying collateral token
    //   // collateralAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    //   // A path to a token logo image
    //   logoURI: "/logos/usdc.png",
    //   // The list of tokens this one is connected to
    //   connections: [{ token: "ethereum|citreatestnet|0x0209791Cf7eDBfCe09AFf7cf7b03fB1c80dD1F9b" }],
    // },
    // {
    //   chainName: 'citreatestnet',
    //   standard: TokenStandard.EvmHypNative,
    //   decimals: 18,
    //   symbol: "cBTC",
    //   name: "Citrea BTC",
    //   addressOrDenom: "0x0209791Cf7eDBfCe09AFf7cf7b03fB1c80dD1F9b",
    //   logoURI: "/logos/usdc.png",
    //   connections: [{ token: "ethereum|basesepolia|0x4aCa973F6b9a52981e63B59e9aa51d15372eB89e" }],
    // },
    {
      chainName: 'sepolia',
      standard: TokenStandard.EvmHypSynthetic,
      decimals: 18,
      symbol: "cBTC",
      name: "Citrea BTC",
      addressOrDenom: "0x52C369f5123dEF09825Ad006505B3C51AaAb3315",
      logoURI: "/logos/usdc.png",
      connections: [{ token: "ethereum|citreatestnet|0xF5Fd68AD561a2C46b988f7031905912B9b8873fB" }],
    },
    {
      chainName: 'citreatestnet',
      standard: TokenStandard.EvmHypNative,
      decimals: 18,
      symbol: "cBTC",
      name: "Citrea BTC",
      addressOrDenom: "0xF5Fd68AD561a2C46b988f7031905912B9b8873fB",
      logoURI: "/logos/usdc.png",
      connections: [{ token: "ethereum|sepolia|0x52C369f5123dEF09825Ad006505B3C51AaAb3315" }],
    },
  ],
  options: {},
};

// tokens:
// - chainName: citreatestnet
//   standard: EvmHypNative
//   decimals: 18
//   symbol: cBTC
//   name: Citrea BTC
//   addressOrDenom: "0xF5Fd68AD561a2C46b988f7031905912B9b8873fB"
//   connections:
//     - token: ethereum|sepolia|0x52C369f5123dEF09825Ad006505B3C51AaAb3315
// - chainName: sepolia
//   standard: EvmHypSynthetic
//   decimals: 18
//   symbol: cBTC
//   name: Citrea BTC
//   addressOrDenom: "0x52C369f5123dEF09825Ad006505B3C51AaAb3315"
//   connections:
//     - token: ethereum|citreatestnet|0xF5Fd68AD561a2C46b988f7031905912B9b8873fB
