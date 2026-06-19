import { Request, Response } from "express";
import { searchCompanies } from "../services/searchService";

export async function search( req: Request, res: Response ) {

    try {

        const query = req.query.q as string;

        if (!query) {

            return res
                .status(400)
                .json({ error: "Query required" });
        }

        const results = await searchCompanies( query );

        return res.json(results);

    } catch (err) {

        console.error( "Search error:", err );

        return res
            .status(500)
            .json({ error: "Search failed" });
    }
}