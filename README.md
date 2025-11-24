# Next.js DummyJSON E‑commerce Sample

# Project Overview
This is an e-commerce web application that displays products to the User. 
The User can add products to a local cart.
The process also updates a backend cart.  Currently, the backend cart returns static JSON.

## Pre-Setup
1. Clone Git Repo into `frontend-nextjs`


## Frontend Setup


1. cd into `frontend-nextjs`
2. `npm install`
3. Create `.env.local` and set `NEXT_PUBLIC_PHP_CART_API` to your PHP API URL.
4. `npm run dev`


Open http://localhost:3000/products


## Notes
- All cart operations call the PHP API at `${NEXT_PUBLIC_PHP_CART_API}`. Adjust `utils/api.ts` to match your PHP endpoints.
- Images use Next/Image and `cdn.dummyjson.com` is configured in `next.config.js`.
- The app is intentionally minimal to keep focus on architecture: TypeScript interfaces, custom hooks, context, and callouts to the PHP API with loading states.

## Backend Setup


1. cd into `backend-php`
2. `composer install`
3. In `backend-php` folder, change `env` file to `.env`
4. Setup `.env` file
5. Add the following:  
```
#--------------------------------------------------------------------
# API URL
#--------------------------------------------------------------------
ALLOWED_ORIGINS=http://localhost:3000
```
6. php spark serve --port 3002

Open http://localhost:3002
http://localhost:3002/api/cart
http://localhost:3002/api/add
http://localhost:3002/api/update/{id}
http://localhost:3002/api/remove/{id}

# Architectural Decisions

I use client side fetching to keep things simple.

I manage the client side cart state with React Context and Reducer.
I chose Context because all the pages need to know about the Cart.

The web application uses Reducer for state changes because there are 
several components that need to modify the state of the Cart.
The components perform different actions on the cart state, so this lends itself 
to using the reducer architecture instead of using useState.  
The custom hook useCart defines actions on the Cart.

I separate Product data from the external Api and Cart logic by setting an 
CartItem type and a Product type.  I add CartItems to the Cart state. 
Cart Api Requests to the backend are made with CartItem data. 
In fact, a Cart Api Request is another type that incorporates the 
CartItem type.
