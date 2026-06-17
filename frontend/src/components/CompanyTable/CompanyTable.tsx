import type { Company } from "../../types/company";
import styles from "./CompanyTable.module.css"

type Props = {
    companies: Company[];
};

export default function CompanyTable({ companies }: Props) {

    return (
        <div className={styles.tableBox}>
            <table className={styles.table}>

                <thead>
                    <tr>

                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Website</th>
                        <th>CareerPage</th>
                        <th>Email</th>
                        <th>Rating</th>
                        <th>Applied</th>

                    </tr>
                </thead>

                <tbody>
                    {companies.map(c=>(

                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.city}</td>
                            <td> {c.website && (
                                <a
                                className={styles.linkButton}
                                href={c.website}
                                target="_blank"
                                rel="noreferrer"
                                > 🌐 Website
                                </a>)}
                            </td>
                            <td> {c.careerPage && (
                                <a
                                className={styles.linkButton}
                                href={c.careerPage}
                                target="_blank"
                                rel="noreferrer"
                                > 💼 Career
                                </a>)}
                            </td>
                            <td>{c.email}</td>
                            <td>{c.rating}</td>
                            <td>{c.applied}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
