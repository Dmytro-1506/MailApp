import { getEmails, sendEmail, deleteEmail } from "../api/emailApi";
import { validateEmail } from "../utils/validateEmail";
import { useEffect, useState } from "react";

import type { Email } from "../types/email";

export function useEmails() {

    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState(false);

    async function loadEmails() {

        try {

            setLoading(true);

            const data = await getEmails();

            setEmails(data);

        } catch (err) {
            console.error(err);
            alert( "Could not load emails" );

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {

        async function init() {
            await loadEmails();
        }

        init();

    }, []);

    async function send( to: string ){

        const error = validateEmail( to, emails );

        if(error){

            alert(error);
            return;
        }

        try {

            await sendEmail(to);
            alert("Sending succes");
            await loadEmails();

        } catch (err) {

            console.error(err);
            alert( "Sending failed" );
        }
    }

    async function remove( id: number ){

        try {

            await deleteEmail(id);
            await loadEmails();

        } catch (err) {

            console.error(err);
            alert( "Delete failed" );
        }
    }

    return { emails, loading, send, remove,  reload: loadEmails };
}
