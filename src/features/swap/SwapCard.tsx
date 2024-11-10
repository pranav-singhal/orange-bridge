import { Card } from '../../components/layout/Card';
import { SwapForm } from './SwapForm';

export const SwapCard = () => {
  return (
    <Card className="w-100 sm:w-[31rem] mb-4">
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
        <div className="flex">
          <div className="py-1">
            <svg
              className="h-6 w-6 text-blue-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold">Testnet Transaction</p>
            <p className="text-sm">
              You are swapping Sepolia ETH for cBTC. This is a testnet transaction and does not involve
              real assets.
            </p>
          </div>
        </div>
      </div>
      <SwapForm />
    </Card>
  );
}; 