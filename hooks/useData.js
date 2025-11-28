'use client';

import { useState, useEffect } from 'react';

export function useData(endpoint) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const response = await fetch(`/api/admin/${endpoint}`);
                const result = await response.json();

                if (result.success) {
                    setData(result.data);
                } else {
                    setError(result.error || 'Failed to fetch data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [endpoint]);

    return { data, loading, error, setData };
}
