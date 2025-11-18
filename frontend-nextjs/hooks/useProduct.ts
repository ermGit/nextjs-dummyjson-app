import { useEffect, useState } from 'react';
import { Product } from '../types';
import { fetchProductById } from '../utils/api';


export function useProduct(id?: number) {
    const [data, setData] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!id) return;
        let mounted = true;
        setLoading(true);
        fetchProductById(id)
            .then((p) => mounted && setData(p))
            .catch((e) => mounted && setError(String(e)))
            .finally(() => mounted && setLoading(false));
        return () => {
            mounted = false;
        };
    }, [id]);


    return { data, loading, error };
}