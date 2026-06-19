import searchSearXNG from "../searxng";
import { findCareerPage } from "./careerFinder";
import { findApplyEmail } from "./emailFinder";

export async function searchCompanies( query: string ){

    const raw = await searchSearXNG(query);

    const results = await Promise.all(raw.slice(0, 10).map(
        async ( r: any, index: number ) => {

            try {

                const career = await findCareerPage(r.url);
                const email = career ? await findApplyEmail(career) : null;
                const rating = await calculateRating(r, career, email);

                return {
                    id: index,
                    name: r.title
                        ?.split("-")[0]
                        ?.trim()
                        || "Unknown",
                    city: null,
                    website: r.url,
                    careerPage: career,
                    email,
                    rating: rating,
                    applied: false,
                };

            } catch (err) {
                console.log("ITEM FAILED:", r.url);

                return {
                    id: index,
                    name: r.title || "Error",
                    city: null,
                    website: r.url,
                    careerPage: null,
                    email: null,
                    rating: 0,
                    applied: false,
                };
            }
        }
    ));

    console.log("FINAL RESULTS", results);

    return results;
}

function calculateRating(
    r: any,
    career: string | null,
    email: string | null
) {

    let score = 50;

    const text = ( r.title + " " + (r.snippet || "")).toLowerCase();

    if (career)
        score += 30;

    if (email)
        score += 40;

    if ( email?.includes("bewerbung"))
        score += 20;

    return Math.min( score, 100 );
}