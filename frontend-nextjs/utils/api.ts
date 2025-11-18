import { CartApiRequest, CartApiResponse } from '../types';


const PHP_API_BASE = process.env.NEXT_PUBLIC_PHP_CART_API;


if (!PHP_API_BASE) {
    console.warn('NEXT_PUBLIC_PHP_CART_API is not set. Cart API calls will fail until you set it.');
}


async function callPhpCartApi(body: CartApiRequest): Promise<CartApiResponse> {
    if (!PHP_API_BASE) {
        throw new Error('PHP cart API base URL is not configured. Set NEXT_PUBLIC_PHP_CART_API');
    }


    const res = await fetch(`${PHP_API_BASE}/cart.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });


    if (!res.ok) {
        const text = await res.text();
        throw new Error(`PHP API error (${res.status}): ${text}`);
    }


    return res.json();
}


export async function apiAddToCart(productId: number, quantity = 1) {
    return callPhpCartApi({ operation: 'add', item: { productId, quantity } });
}


export async function apiUpdateCart(productId: number, quantity: number) {
    return callPhpCartApi({ operation: 'update', item: { productId, quantity } });
}


export async function apiRemoveFromCart(productId: number) {
    return callPhpCartApi({ operation: 'remove', item: { productId, quantity: 0 } });
}


// DummyJSON product fetch helpers
export async function fetchProducts(limit = 30, skip = 0) {
    const r = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    if (!r.ok) throw new Error('Failed fetching products');
    const json = await r.json();
    return json.products as any[];
}


export async function fetchProductById(id: number) {
    const r = await fetch(`https://dummyjson.com/products/${id}`);
    if (!r.ok) throw new Error('Failed fetching product');
    return (await r.json()) as any;
}