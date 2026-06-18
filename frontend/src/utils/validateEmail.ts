import type { Email } from "../types/email";

export function validateEmail( to: string, emails: Email[] ): string | null {

    const email =  to.trim().toLowerCase();

    if (!email)
        return "Bitte Email eingeben";

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email))
        return "Ungültige Email";

    const exists = emails.some( e =>
            e.to_email
                .toLowerCase()
                .trim() === email
        );

    if (exists)
        return "Bereits beworben";

    return null;
}