import { Request, Response } from "express";
import { searchCompanies } from "../services/searchService";

export async function search(req: Request, res: Response){

    try{

        const q = req.query.q as string;

        if(!q){

            return res
            .status(400)
            .json({
            error:
            "Query required"
            });
        }

        const result = await searchCompanies(q);

        return res.json(result);

    } catch(err) {
        console.error(err);

        res.status(500).json({
            error: "Search failed"
        });
    }
}