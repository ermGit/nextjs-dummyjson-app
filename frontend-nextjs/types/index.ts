// External product models (DummyJSON)
export interface Rating {
    rate: number;
    count: number;
}


export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
}


// Cart item kept in client state
export interface CartItem {
    productId: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail?: string;
}


// API contract for PHP cart operations (simple)
export type CartOperation = 'get' | 'add' | 'update' | 'remove';


export interface CartApiRequest {
    operation: CartOperation;
    method: string;
    endpoint: string;
    item: {
        productId?: number;
        quantity?: number;
    };
}

export interface CartApiResponse {
    success: boolean;
    message?: string;
    cart?: {
        items: Array<{
            productId: number;
            quantity: number;
            price: number;
        }>;
        subtotal: number;
        tax: number;
        total: number;
    };
}