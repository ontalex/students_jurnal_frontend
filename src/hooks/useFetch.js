import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

const useFetch = (method, dataProps, immediately, onFinish = () => null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediately);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (data) => {
        setLoading(true);
        setError(null);
        console.log("USEFETCH: on useCalback");
        try {
            const response = await axios.request({
                method,
                ...data
            });
            setData(response.data);
            onFinish();
        } catch (err) {
            setError(err);
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [method]);

    // Fetch data when the component mounts or the URL changes
    useEffect(() => {
        if (immediately === true) {
            console.log("USEFETCH: on useEffect");
            fetchData(dataProps);
        }
    }, []);

    // Refresh method
    const refresh = (data) => {
        fetchData(data);
    };

    return { data, loading, error, refresh };
};

export default useFetch;