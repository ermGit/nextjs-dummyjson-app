import { useCartContext } from '../context/CartProvider';
import { CartItem } from '../types';


export function useCart() {
    const ctx = useCartContext();


    const addToCart = async (item: CartItem) => {
        return ctx.dispatchAdd(item);
    };


    const updateQuantity = async (productId: number, quantity: number) => {
        return ctx.dispatchUpdate(productId, quantity);
    };


    const removeFromCart = async (productId: number) => {
        return ctx.dispatchRemove(productId);
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