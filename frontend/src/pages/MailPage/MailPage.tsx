import { useEmails } from "../../hooks/useEmails"
import { useState } from "react";
import EmailTable from "../../components/EmailTable/EmailTable";
import SendBox from "../../components/SendBox/SendBox"

export default function MailPage() {

  const { remove, send, emails } = useEmails();
  const [sortBy, setSortBy] = useState("date-desc");

  return(

    <div style={{ padding: 20 }}>

      <SendBox sendHandler={send} />

      <EmailTable
          emails={emails}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onDelete={remove}
      />
    </div>
  );
}
