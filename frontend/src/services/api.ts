const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = async(
    endpoint: string,
    options: RequestInit = {}
) => {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    const res = await fetch(`${API_URL}/${endpoint}`, {
        ...options,
        headers,
    });
    if (!res.ok) {
        throw new Error("Error en la petición");
    }
    return res.json();
};
