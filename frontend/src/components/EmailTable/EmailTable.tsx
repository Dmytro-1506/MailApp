import styles from "./EmailTable.module.css";
import type { Email } from "../../types/email";
import { sortEmails } from "../../utils/sortEmails";

type Props = {
    emails: Email[];
    sortBy: string;
    setSortBy: ( value: string ) => void;
    onDelete: ( id: number ) => void;
};

export default function EmailTable({
    emails,
    sortBy,
    setSortBy,
    onDelete
}: Props) {

    const sortedEmails = sortEmails(emails, sortBy);

    return (

        <div>
            <div className={styles.tableHeader}>

                <h2 className={styles.subtitle}>
                    frühere Bewerbungen
                </h2>

                <div className={styles.sortContainer}>

                    <label className={styles.sortLabel}>
                        Sortieren:
                    </label>

                    <select
                        className={styles.sortSelect}
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}>
                        
                        <option value="date-desc">
                            Neueste zuerst
                        </option>

                        <option value="date-asc">
                            Älteste zuerst
                        </option>

                        <option value="id">
                            ID
                        </option>

                        <option value="email">
                            Email A → Z
                        </option>

                    </select>
                </div>
            </div>

            <table className={styles.table}>

                <thead>
                    <tr>

                        <th>ID</th>
                        <th>To</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th></th>

                    </tr>
                </thead>

                <tbody>

                    {sortedEmails.map(email => (

                        <tr key={email.id}>

                            <td> {email.id} </td>

                            <td> {email.to_email} </td>

                            <td style={{fontSize: 10}}> {email.subject} </td>

                            <td> {email.message} </td>

                            <td> { new Date( email.created_at )
                                    .toLocaleString()
                                }
                            </td>

                            <td>
                                <button className={styles.deleteButton}
                                    onClick={() => {
                                        if ( confirm( "Delete this email?" )) {
                                            onDelete( email.id);
                                        }}}>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-2 14H7L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4h6v2" />
                                    </svg>
                                </button>

                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}