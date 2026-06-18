import { useState } from "react";

import styles from "./SendBox.module.css";

type Props = {
    sendHandler: ( to: string ) => void
}

export default function SendBox( {sendHandler}: Props ) {

    const [to, setTo] = useState("");
    
    return (
        <div className={styles.sendBox}>

            <input
                className={styles.input}
                placeholder="wobei möchtest Du dich bewerben"
                value={to}
                onChange={e => setTo(e.target.value)}
                />

            <button className={styles.button} onClick={() => sendHandler(to)} >
                Bewerben
            </button>
        </div>
    )
}