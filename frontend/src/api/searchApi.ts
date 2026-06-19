export async function searchCompanies(query: string) {

    const API = import.meta.env.VITE_API_URL;

    const res = await fetch(
        `${API}/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
        throw new Error("Search failed");
    }

    const data = await res.json();

    console.log("API RESPONSE:", data);

    return Array.isArray(data) ? data : data.results;
}