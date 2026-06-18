import type { Email } from "../types/email";

const URL = "http://localhost:3000/emails";

export async function getEmails(): Promise<Email[]> {

    const res = await fetch(URL);

    return res.json();
}

export async function sendEmail( to: string ) {

    await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to })
    });
}

export async function deleteEmail( id: number ) {

    await fetch( `${URL}/${id}`, { method: "DELETE" } );
}