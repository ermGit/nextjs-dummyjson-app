# Next.js DummyJSON E‑commerce Sample


## Setup


1. `npm install`
2. Create `.env.local` and set `NEXT_PUBLIC_PHP_CART_API` to your PHP API URL.
3. `npm run dev`


Open http://localhost:3000/products


## Notes
- All cart operations call the PHP API at `${NEXT_PUBLIC_PHP_CART_API}/cart.php`. Adjust `utils/api.ts` to match your PHP endpoints.
- Images use Next/Image and `i.dummyjson.com` is configured in `next.config.js`.
- The app is intentionally minimal to keep focus on architecture: TypeScript interfaces, custom hooks, context, and callouts to the PHP API with loading states.