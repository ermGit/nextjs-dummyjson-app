import React from 'react';
import { useCart } from '../hooks/useCart';


export const CartModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const { items, subtotal, updateQuantity, removeFromCart, loadingMap } = useCart();


    if (!open) return null;


    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: 600, background: 'white', padding: 20, borderRadius: 8 }}>
                <h2>Your Cart</h2>
                <button onClick={onClose} style={{ position: 'absolute', right: 12, top: 12 }}>
                    Close
                </button>
                {items.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    <div>
                        {items.map((it) => (
                            <div key={it.productId} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                                <div style={{ width: 64, height: 64, background: '#eee' }}>
                                    {it.thumbnail && <img src={it.thumbnail} alt={it.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600 }}>{it.title}</div>
                                    <div>${it.price.toFixed(2)}</div>
                                </div>


                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <button
                                        onClick={() => updateQuantity(it.productId, Math.max(1, it.quantity - 1))}
                                        disabled={loadingMap[it.productId]}
                                    >
                                        -
                                    </button>
                                    <div>{it.quantity}</div>
                                    <button onClick={() => updateQuantity(it.productId, it.quantity + 1)} disabled={loadingMap[it.productId]}>
                                        +
                                    </button>
                                </div>


                                <div style={{ width: 120, textAlign: 'right' }}>${(it.price * it.quantity).toFixed(2)}</div>


                                <div>
                                    <button onClick={() => removeFromCart(it.productId)} disabled={loadingMap[it.productId]}>
                                        {loadingMap[it.productId] ? 'Working...' : 'Remove'}
                                    </button>
                                </div>
                            </div>
                        ))}


                        <hr />
                        <div style={{ textAlign: 'right', fontWeight: 700 }}>
                            Subtotal: ${subtotal.toFixed(2)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


export default CartModal;