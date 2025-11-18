import Link from 'next/link';
import Layout from '../components/Layout';


export default function Home() {
    return (
        <Layout>
            <h1>Welcome</h1>
            <p>
                Visit <Link href="/products">/products</Link> to see the product listing fetched from DummyJSON.
            </p>
        </Layout>
    );
}