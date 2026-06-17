export type Company = {
    id: number;
    name: string;
    city: string | null;
    website: string;
    careerPage: string | null;
    email: string | null;
    rating: number;
    applied: boolean;
};