import type { SearchResult } from "../types/search";
import type { Company } from "../types/company";

export function mapSearchResults( results: SearchResult[] ): Company[] {

    return results.map((r, index) => ({

        id: index,
        name:
            r.title
                ?.split("|")[0]
                ?.split("-")[0]
                ?.trim()
            || "Unknown",
        city: null,
        website: r.url,
        careerPage: r.url,
        email: null,
        rating: calculateRating(r),
        applied: false
    }));
}

function calculateRating( result: SearchResult ): number {

    let score = 50;

    const text =
        `${result.title} ${result.snippet}`
        .toLowerCase();

    if (text.includes("karriere"))
        score += 20;

    if (text.includes("jobs"))
        score += 10;

    if (text.includes("bewerbung"))
        score += 10;

    return Math.min(score, 100);
}