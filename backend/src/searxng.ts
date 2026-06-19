// searxng.ts
import axios from "axios";

export default async function searchSearXNG(query: string) {

    try {
    
        const res = await axios.get("http://searxng:8080/search", {
            params: {
                q: query,
                format: "json",
                engines: "google,duckduckgo,startpage",
                categories: "general",
                language: "de",
            },
            timeout: 10000,
        });

        console.log(
            "RAW RESULT:",
            JSON.stringify(
                res.data,
                null,
                2
            ));
        

        const results =
            res.data.results.map((r: any) => ({
                title: r.title,
                url: r.url,
                snippet: r.content,
            }));

        console.log("MAPPED:", results);
        return results;
    } catch (err: any) {
        console.error("SEARX ERROR", err);
        console.log("STATUS:", err.response?.status);
        console.log("BODY:", err.response?.data);
        return [];
    }
}