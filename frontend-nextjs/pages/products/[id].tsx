import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useProduct } from '../../hooks/useProduct';
import Image from 'next/image';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';


export default function ProductDetailPage() {
    const router = useRouter();
    const id = Number(router.query.id);
    const { data, loading, error } = useProduct(id);
    const { addToCart, loadingMap } = useCart();
    const [adding, setAdding] = useState(false);


    if (loading) return (
        <Layout>
            <p>Loading product...</p>
        </Layout>
    );


    if (error) return (
        <Layout>
            <p style={{ color: 'red' }}>{error}</p>
        </Layout>
    );


    if (!data) return (
        <Layout>
            <p>Product not found</p>
        </Layout>
    );


    const thumbnail = data.thumbnail ?? (data.images && data.images[0]) ?? '';


    const onAdd = async () => {
        setAdding(true);
        try {
            await addToCart({ productId: data.id, title: data.title, price: data.price, quantity: 1, thumbnail });
        } catch (e) {
            alert('Add failed: ' + String(e));
        } finally {
            setAdding(false);
        }
    };


    const isLoading = loadingMap[data.id] || adding;


    return (
        <Layout>
            <div style={{ display: 'flex', gap: 20 }}>
                {thumbnail && (
                    <div style={{ width: 360, height: 360, position: 'relative' }}>
                        <Image src={thumbnail} layout="fill" objectFit="contain" alt={data.title} />
                    </div>
                )}
                <div>
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                    <div style={{ fontWeight: 700 }}>${data.price.toFixed(2)}</div>
                    <div style={{ marginTop: 12 }}>
                        <button onClick={onAdd} disabled={isLoading}>{isLoading ? 'Adding...' : 'Add to Cart'}</button>
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <strong>Stock:</strong> {data.stock ?? 'N/A'}
                    </div>
                </div>
            </div>
        </Layout>
    );
}