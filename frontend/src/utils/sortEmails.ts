import type { Email } from "../types/email";

export function sortEmails(
    emails: Email[],
    sortBy: string
): Email[] {

    return [...emails].sort((a, b) => {

        switch (sortBy) {

            case "id":
                return a.id - b.id;

            case "email":
                return a.to_email.localeCompare(
                    b.to_email
                );

            case "date-asc":
                return (
                    new Date(a.created_at).getTime()
                    -
                    new Date(b.created_at).getTime()
                );

            case "date-desc":
            default:
                return (
                    new Date(b.created_at).getTime()
                    -
                    new Date(a.created_at).getTime()
                );
        }
    });
}