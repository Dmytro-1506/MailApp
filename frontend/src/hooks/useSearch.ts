import { useState } from "react";
import { searchCompanies } from "../api/searchApi";
import type { Company } from "../types/company";

export function useSearch() {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);

    async function search( query: string ) {

        setLoading(true);

        try {

            const data = await searchCompanies(query);
            console.log(data);

            setCompanies(data);

        } finally {
            setLoading(false);
        }

        } return { companies, loading, search };
}