import React, { createContext, useContext, useReducer, useMemo, useState } from 'react';
import { CartItem } from '../types';
import * as api from '../utils/api';


type State = { items: CartItem[] };


type Action =
    | { type: 'SET_ITEMS'; items: CartItem[] }
    | { type: 'ADD'; item: CartItem }
    | { type: 'UPDATE'; productId: number; quantity: number }
    | { type: 'REMOVE'; productId: number };


const initialState: State = { items: [] };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_ITEMS':
            return { items: action.items };
        case 'ADD': {
            const exists = state.items.find((i) => i.productId === action.item.productId);
            if (exists) {
                return {
                    items: state.items.map((it) =>
                        it.productId === action.item.productId
                            ? { ...it, quantity: it.quantity + action.item.quantity }
                            : it
                    )
                };
            }
            return { items: [...state.items, action.item] };
        }
        case 'UPDATE':
            return {
                items: state.items.map((it) => (it.productId === action.productId ? { ...it, quantity: action.quantity } : it))
            };
        case 'REMOVE':
            return { items: state.items.filter((it) => it.productId !== action.productId) };
        default:
            return state;
    }
}

const CartContext = createContext<{
    items: CartItem[];
    subtotal: number;
    dispatchGet: () => Promise<void>;
    dispatchAdd: (item: CartItem) => Promise<void>;
    dispatchUpdate: (cartId: number, productId: number, quantity: number) => Promise<void>;
    dispatchRemove: (cartId: number, productId: number) => Promise<void>;
// loading state per productId
    loadingMap: Record<number, boolean>;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({});


    const subtotal = useMemo(() => state.items.reduce((s, it) => s + it.price * it.quantity, 0), [state.items]);


    const setLoading = (productId: number, val: boolean) =>
        setLoadingMap((m) => ({ ...m, [productId]: val }));

    async function dispatchGet() {
// optimistic update locally
        dispatch({ type: 'SET_ITEMS', items: [] });
        try {
            setLoading(9999, true);
            await api.apiGetCart();
        } catch (e) {
            console.error('Get cart API error', e);
// rollback naive: remove item or decrement — here we remove to keep simple
            //dispatch({ type: 'REMOVE', productId: item.productId });
            throw e;
        } finally {
            setLoading(9999, false);
        }
    }


    async function dispatchAdd(item: CartItem) {
// optimistic update locally
        dispatch({ type: 'ADD', item });
        try {
            setLoading(item.productId, true);
            await api.apiAddToCart(item.productId, item.quantity);
        } catch (e) {
            console.error('Add to cart API error', e);
// rollback naive: remove item or decrement — here we remove to keep simple
            dispatch({ type: 'REMOVE', productId: item.productId });
            throw e;
        } finally {
            setLoading(item.productId, false);
        }
    }

    async function dispatchUpdate(cartId: number, productId: number, quantity: number) {
        dispatch({ type: 'UPDATE', productId, quantity });
        try {
            setLoading(productId, true);
            await api.apiUpdateCart(cartId, productId, quantity);
        } catch (e) {
            console.error('Update cart API error', e);
// no rollback implemented here for brevity
            throw e;
        } finally {
            setLoading(productId, false);
        }
    }

    async function dispatchRemove(cartId: number, productId: number) {
        const prev = state.items.find((i) => i.productId === productId);
        dispatch({ type: 'REMOVE', productId });
        try {
            setLoading(productId, true);
            await api.apiRemoveFromCart(cartId, productId);
        } catch (e) {
            console.error('Remove from cart API error', e);
// naive rollback
            if (prev) dispatch({ type: 'ADD', item: prev });
            throw e;
        } finally {
            setLoading(productId, false);
        }
    }


    return (
        <CartContext.Provider
            value={{ items: state.items, subtotal, dispatchGet, dispatchAdd, dispatchUpdate, dispatchRemove, loadingMap }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useCartContext() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCartContext must be used inside CartProvider');
    return ctx;
}