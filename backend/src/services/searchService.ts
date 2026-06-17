import searchSearXNG from "../searxng";

export async function searchCompanies( query: string ){

    const raw = await searchSearXNG(query);

    return raw.slice(0,20).map((r: any, index: number) => ({

        id: index,
        name: r.title?.split("-")[0]?.trim(),
        city: null,
        website: r.url,
        careerPage: r.url,
        email: null,
        rating: calculateRating( r ),
        applied:false
    }));
}

function calculateRating( r: any ) {

    let score = 50;

    const text = ( r.title + " " + ( r.snippet || "" )).toLowerCase();

    if (text.includes("karriere")) score+=20;

    if (text.includes("bewerbung")) score+=10;

    if (text.includes("jobs")) score+=10;

    return score;
}