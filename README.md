# Orange Bridge
Join Bitcoin, without leaving Ethereum.


<img src="./public/orange-bridge.jpeg" alt="Orange Bridge Logo" width="200" />


You can add `.env.local` file next to `.env.example` where you set `projectId` copied from WalletConnect Cloud.

```sh
yarn dev
```

Or you can set the WalletConnect Cloud `projectId` to use as follows:
```
NEXT_PUBLIC_WALLET_CONNECT_ID=<projectId> yarn dev
```

### Test

```sh
# Lint check code
yarn lint

# Check code types
yarn typecheck
```

### Format

```sh
# Format code using Prettier
yarn prettier
```

### Clean / Reset

```sh
# Delete build artifacts to start fresh 
yarn clean
```

## Deployment

The easiest hosting solution for this Next.JS app is to create a project on Vercel.

## Learn more

For more information, see the [Hyperlane documentation](https://docs.hyperlane.xyz/docs/reference/applications/warp-routes).
