import { useState, useEffect, useCallback } from 'react';

const useFetch = (url, params, method, immediately = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await method(url, params);
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [url]);

    // Fetch data when the component mounts or the URL changes
    useEffect(() => {
        if (immediately) {
            fetchData();
        }
    }, [fetchData, immediately]);

    // Refresh method
    const refresh = () => {
        fetchData();
    };

    return { data, loading, error, refresh };
};

export default useFetch;