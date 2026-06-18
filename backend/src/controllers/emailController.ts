import { Request, Response } from "express";
import { sendEmail, getEmails, removeEmail } from "../services/emailService";

export async function createEmail( req: Request, res: Response ) {

    try{

        const { to } = req.body;

        await sendEmail(to);
        res.json({ success: true });
        
    } catch(err) {

        console.error(err);
        res.status(500).json({ error: "Send failed" });
    }
}

export async function listEmails(_: Request, res: Response ) {

    try{

        const emails = await getEmails();
        res.json( emails );

    } catch {

        res.status(500).json({ error: "Load failed" });
    }
}

export async function deleteEmail( req: Request, res: Response ) {

    try{

        await removeEmail(Number(req.params.id));
        res.json({ success: true });

    } catch {

        res.status(500).json({ error: "Delete failed" });
    }
}