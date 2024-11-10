import { CurrencyAmount, Percent } from '@uniswap/sdk-core';
import { Pair, Route, Trade } from '@uniswap/v2-sdk';
import { ethers } from 'ethers';
import { Form, Formik } from 'formik';
import { useEffect, useMemo } from 'react';
import { useAccount, useBalance, usePublicClient } from 'wagmi';

import { SolidButton } from '../../components/buttons/SolidButton';
import { TextField } from '../../components/input/TextField';

import { CBTC, SEPOLIA_CHAIN_ID, WETH } from './constants';
import { SwapFormValues } from './types';

// Import the Uniswap V2 Pair ABI (you'll need to create this)
import UNISWAP_V2_PAIR_ABI from './abis/UniswapV2Pair.json';
import { UNISWAP_V2_PAIR_ADDRESS } from './constants';
import { useSwapCallback } from './useSwapCallback';

export const SwapForm = () => {
  const initialValues = useFormInitialValues();
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient({
    chainId: SEPOLIA_CHAIN_ID
  });
  
  const { data: ethBalance } = useBalance({
    address,
    chainId: SEPOLIA_CHAIN_ID,
  });

  const validateForm = (values: SwapFormValues) => {
    const errors: Partial<SwapFormValues> = {};
    if (!values.fromAmount) errors.fromAmount = 'Required';
    return errors;
  };

  const onSubmitForm = (values: SwapFormValues) => {
    // Will implement later
    console.log('Swap form values:', values);
  };

  // Format balance to 4 decimal places
  const formattedBalance = ethBalance?.formatted 
    ? Number(ethBalance.formatted).toFixed(4) 
    : '0';

  return (
    <Formik<SwapFormValues>
      initialValues={initialValues}
      onSubmit={onSubmitForm}
      validate={validateForm}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isValidating, values, setFieldValue }) => {
        const { executeSwap, isLoading: isSwapping, error: swapError } = useSwapCallback(values.fromAmount);

        // Effect to calculate output amount when input changes
        useEffect(() => {
          const calculateOutputAmount = async () => {
            if (!values.fromAmount || !publicClient) return;

            try {
              // Get reserves using publicClient
              const result = await publicClient.readContract({
                address: UNISWAP_V2_PAIR_ADDRESS,
                abi: UNISWAP_V2_PAIR_ABI,
                functionName: 'getReserves',
              }) as [bigint, bigint, number];

              const [reserve0, reserve1] = result;
              
              // Create pair instance
              const pair = new Pair(
                CurrencyAmount.fromRawAmount(WETH, reserve0.toString()),
                CurrencyAmount.fromRawAmount(CBTC, reserve1.toString())
              );

              // Create trade route
              const route = new Route([pair], WETH, CBTC);

              console.log("Route values:", route, values);

              // Calculate trade
              const amountIn = CurrencyAmount.fromRawAmount(
                WETH,
                ethers.utils.parseEther(values.fromAmount.toString()).toString()
              );

              console.log("Amount in values:", amountIn);

              const trade = Trade.exactIn(route, amountIn);

              console.log("Trade values:", trade);

              // Create slippage tolerance of 0.5%
              const slippageTolerance = new Percent('50', '10000'); // 50/10000 = 0.5%

              // Get the minimum amount out
              const minimumAmountOut = trade.minimumAmountOut(slippageTolerance);

              console.log("Minimum amount out values:", minimumAmountOut);

              // Format the output amount using ethers.utils.formatEther since it's 18 decimals
              const formattedAmount = ethers.utils.formatEther(minimumAmountOut.quotient.toString());
              
              // Round to 6 decimal places for display
              const roundedAmount = Number(formattedAmount).toFixed(6);

              // Update output amount
              setFieldValue('toAmount', roundedAmount);
            } catch (error) {
              console.error('Error calculating swap amount:', error);
              setFieldValue('toAmount', '0');
            }
          };

          calculateOutputAmount();
        }, [values.fromAmount, publicClient, setFieldValue]);

        return (
          <Form className="flex w-full flex-col items-stretch">
            <div className="p-4">
              <div className="space-y-4">
                {/* From ETH section */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      You Pay
                    </label>
                    <div className="text-sm text-gray-500">
                      <span>Sepolia ETH</span>
                      {isConnected && (
                        <span className="ml-2">
                          (Balance: {formattedBalance})
                        </span>
                      )}
                    </div>
                  </div>
                  <TextField
                    name="fromAmount"
                    placeholder="0.0"
                    type="number"
                    step="any"
                    classes="mt-2 w-full"
                  />
                </div>

                {/* Swap direction indicator */}
                <div className="flex justify-center">
                  <div className="p-2">↓</div>
                </div>

                {/* To cBTC section */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      You Receive
                    </label>
                    <span className="text-sm text-gray-500">cBTC</span>
                  </div>
                  <TextField
                    name="toAmount"
                    placeholder="0.0"
                    type="number"
                    step="any"
                    classes="mt-2 w-full"
                    disabled
                  />
                </div>

                {/* Action Button */}
                {isConnected ? (
                  <div>
                    <SolidButton
                      type="button"
                      color="primary"
                      onClick={executeSwap}
                      disabled={isSwapping || !values.fromAmount}
                      classes="w-full relative"
                    >
                      <span className={isSwapping ? 'opacity-0' : ''}>
                        Swap ETH for cBTC
                      </span>
                      {isSwapping && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        </div>
                      )}
                    </SolidButton>
                    {swapError && (
                      <div className="mt-2 text-red-500 text-sm text-center">
                        {swapError}
                      </div>
                    )}
                  </div>
                ) : (
                  <SolidButton
                    type="button"
                    color="primary"
                    onClick={() => {}} // Wallet connection will be handled by the button itself
                    classes="w-full"
                  >
                    Connect Wallet
                  </SolidButton>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

function useFormInitialValues(): SwapFormValues {
  return useMemo(
    () => ({
      fromAmount: '',
      toAmount: '',
    }),
    [],
  );
} 