import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';


const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { addToCart, loadingMap } = useCart();
    const [adding, setAdding] = useState(false);


    const thumbnail = product.thumbnail ?? (product.images && product.images[0]) ?? '';


    const onAdd = async () => {
        setAdding(true);
        try {
            await addToCart({ productId: product.id, title: product.title, price: product.price, quantity: 1, thumbnail });
        } catch (e) {
            alert('Failed to add to cart: ' + String(e));
        } finally {
            setAdding(false);
        }
    };


    const isLoading = loadingMap[product.id] || adding;


    return (
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <Link href={`/products/${product.id}`}>
                {/*<a>*/}
                    {thumbnail && (
                        <div style={{ width: '100%', height: 160, position: 'relative' }}>
                            <Image src={thumbnail} layout="fill" objectFit="cover" alt={product.title} />
                        </div>
                    )}
                    <h3>{product.title}</h3>
                {/*</a>*/}
            </Link>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={onAdd} disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add to Cart'}
            </button>
        </div>
    );
};


export default ProductCard;