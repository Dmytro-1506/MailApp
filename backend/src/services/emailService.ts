import fs from "fs";
import path from "path";

import { pool } from "../db/pool";

import { transporter } from "../config/mail";

export async function sendEmail( to: string ) {

    const subject =
        "Bewerbung um einen Platz für die betriebliche Praxisphase als Fachinformatiker für Anwendungsentwicklung";

    const message =
        "Empty message";

    const filePath =
        path.join(
            process.cwd(),
            "files",
            "Bewerbungsunterlagen_Anwendungsentwickler_Dmytro_Shkilniuk.pdf"
        );

    const htmlPath =
        path.join(
            process.cwd(),
            "files",
            "emailText.html"
        );

    const html =
        fs.readFileSync(
            htmlPath,
            "utf-8"
        );

    await transporter.sendMail({

        from:  process.env.EMAIL_USER,
        to,
        subject,
        text:  message,
        html,
        attachments:[
            {
                filename: "Bewerbungsunterlagen_Anwendungsentwickler_Dmytro_Shkilniuk.pdf",
                path: filePath
            }
        ]
    });

    await pool.query(
        ` INSERT INTO emails (
            to_email,
            subject,
            message
        )

        VALUES ( $1, $2, $3 )`,
        [to, subject, message])
}

export async function getEmails() {

    const result = await pool.query(
        `SELECT * FROM emails
        ORDER BY created_at DESC`
    );

    return result.rows;
}

export async function removeEmail( id: number ) {

    await pool.query(
        `DELETE FROM emails
        WHERE id=$1`,
        [id]
    );
}