import ProductCard from './ProductCard';
import { Product } from '../types';


const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {products.map((p) => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    );
};


export default ProductList;