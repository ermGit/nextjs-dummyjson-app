import { useCartContext } from '../context/CartProvider';
import { CartItem } from '../types';


export function useCart() {
    const ctx = useCartContext();

    const getCart = async () => {
        return ctx.dispatchGet();
    };

    const addToCart = async (item: CartItem) => {
        return ctx.dispatchAdd(item);
    };


    const updateQuantity = async (cartId: number, productId: number, quantity: number) => {
        return ctx.dispatchUpdate(cartId, productId, quantity);
    };


    const removeFromCart = async (cartId: number, productId: number) => {
        return ctx.dispatchRemove(cartId, productId);
    };


    return {
        items: ctx.items,
        subtotal: ctx.subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        loadingMap: ctx.loadingMap
    };
}