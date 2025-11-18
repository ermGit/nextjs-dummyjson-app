import Layout from '../../components/Layout';
import ProductList from '../../components/ProductList';
import { useProducts } from '../../hooks/useProducts';


export default function ProductsPage() {
    const { data, loading, error } = useProducts(30);


    return (
        <Layout>
            <h1>Products</h1>
            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <ProductList products={data} />}
        </Layout>
    );
}