# Next.js DummyJSON E‑commerce Sample


## Frontend Setup


1. Clone Git Repo into `frontend-nextjs`
2. cd into `frontend-nextjs`
3. `npm install`
4. Create `.env.local` and set `NEXT_PUBLIC_PHP_CART_API` to your PHP API URL.
5. `npm run dev`


Open http://localhost:3000/products


## Notes
- All cart operations call the PHP API at `${NEXT_PUBLIC_PHP_CART_API}`. Adjust `utils/api.ts` to match your PHP endpoints.
- Images use Next/Image and `cdn.dummyjson.com` is configured in `next.config.js`.
- The app is intentionally minimal to keep focus on architecture: TypeScript interfaces, custom hooks, context, and callouts to the PHP API with loading states.

## Backend Setup


1. Clone Git Repo into `backend-php` folder
2. cd into `backend-php`
3. `composer install`
4. In `backend-php` folder, change `env` file to `.env`
5. Setup `.env` file
6. Add the following:  
```
#--------------------------------------------------------------------
# API URL
#--------------------------------------------------------------------
ALLOWED_ORIGINS=http://localhost:3000
```
7. php spark serve --port 3002

Open http://localhost:3002
http://localhost:3002/api/cart
http://localhost:3002/api/add
http://localhost:3002/api/update/{id}
http://localhost:3002/api/remove/{id}