import axios from "axios";

export async function findApplyEmail( url: string ) {

    try {

        const res = await axios.get( url, { timeout: 5000 });

        const html = res.data;

        const matches = [String(html.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi))];

        if (!matches)
            return null;

        const priorities = [
            "bewerbung",
            "career",
            "karriere",
            "jobs",
            "hr",
            "recruiting",
        ];

        const best = matches.find( email =>
                priorities.some( p => email.toLowerCase().includes(p)));

        return best || matches[0];

    } catch {

        return null;
    }
}