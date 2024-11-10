import { ethers } from 'ethers';
import { useState } from 'react';
import { useAccount, useContractWrite, useNetwork, useSwitchNetwork, useWaitForTransaction } from 'wagmi';

import ERC20_ABI from './abis/ERC20.json';
import UNISWAP_V2_ROUTER_ABI from './abis/UniswapV2Router.json';
import { CBTC, ROUTER_ADDRESS, SEPOLIA_CHAIN_ID, WETH } from './constants';

export function useSwapCallback(fromAmount: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { write: approveToken, data: approvalHash } = useContractWrite({
    address: WETH.address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'approve',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const { write: writeContract, data: swapHash } = useContractWrite({
    address: ROUTER_ADDRESS as `0x${string}`,
    abi: UNISWAP_V2_ROUTER_ABI,
    functionName: 'swapExactTokensForTokens',
    chainId: SEPOLIA_CHAIN_ID,
  });

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: approvalHash?.hash,
    onSuccess: (receipt) => {
      executeSwapAfterApproval();
    },
    onError: () => {
      setIsLoading(false);
      setError('Approval failed');
    }
  });

  const { isLoading: isSwapping } = useWaitForTransaction({
    hash: swapHash?.hash,
    onSuccess: () => {
      setIsLoading(false);
      setError(null);
    },
    onError: () => {
      setIsLoading(false);
      setError('Swap failed');
    }
  });

  const executeSwapAfterApproval = () => {
    if (!address || !fromAmount) return;

    try {
      const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
      const path = [WETH.address, CBTC.address];
      
      const amountString = Number(fromAmount).toString();
      const amountIn = ethers.utils.parseEther(amountString);

      writeContract({
        args: [
          BigInt(amountIn.toString()),
          BigInt(0),
          path,
          address,
          deadline,
        ],
      });
    } catch (err) {
      console.error('Swap failed:', err);
      setError(err instanceof Error ? err.message : 'Swap failed');
      setIsLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!address || !fromAmount) return;

    try {
      setIsLoading(true);
      setError(null);

      // Check if we're on the correct network
      if (chain?.id !== SEPOLIA_CHAIN_ID) {
        if (switchNetwork) {
          await switchNetwork(SEPOLIA_CHAIN_ID);
        } else {
          throw new Error('Please switch to Sepolia network manually');
        }
        return; // Return here as the network switch will trigger a re-render
      }

      const amountString = Number(fromAmount).toString();
      const amountIn = ethers.utils.parseEther(amountString);
      
      // Approve max uint256 value
      const maxApproval = ethers.constants.MaxUint256.toString();
      
      approveToken({
        args: [
          ROUTER_ADDRESS as `0x${string}`,
          BigInt(maxApproval),
        ],
      });

    } catch (err) {
      console.error('Approval failed:', err);
      setError(err instanceof Error ? err.message : 'Approval failed');
      setIsLoading(false);
    }
  };

  return {
    executeSwap,
    isLoading: isLoading || isApproving || isSwapping,
    error,
  };
} 