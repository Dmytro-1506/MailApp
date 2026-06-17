export async function searchCompanies(query: string) {

    const res =
    await fetch(
    `http://localhost:3000/search?q=${encodeURIComponent(query)}`
    );

    if (!res.ok) {
        throw new Error(
        "Search failed"
        );
    }

    return res.json();
}