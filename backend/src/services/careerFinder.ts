import axios from "axios";
import * as cheerio from "cheerio";

const CAREER_WORDS = [
    "karriere",
    "jobs",
    "job",
    "career",
    "stellen",
    "bewerbung",
    "vacancies",
];

export async function findCareerPage( website: string ): Promise<string | null> {

    try {

        const res =  await axios.get( website, { timeout: 5000 });

        const $ = cheerio.load( res.data );

        const links: string[] = [];

        $("a").each((_, el) => {

            const href = $(el).attr("href");

            if (href)
                links.push( href );
        });

        const career = links.find(link => {

                const text = link.toLowerCase();

                return CAREER_WORDS.some(word => text.includes(word));
            });

        if (!career)
            return null;

        return new URL( career, website ).href;

    } catch {

        return null;
    }
}