import { useEffect, useState } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../utils/api';


export function useProducts(limit = 30) {
    const [data, setData] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetchProducts(limit)
            .then((p) => mounted && setData(p))
            .catch((e) => mounted && setError(String(e)))
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, [limit]);


    return { data, loading, error };
}