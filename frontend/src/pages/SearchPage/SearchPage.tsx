import SearchInput from "../../components/SearchInput/SearchInput";
import CompanyTable from "../../components/CompanyTable/CompanyTable";
import { useSearch } from "../../hooks/useSearch";

import styles from "./SearchPage.module.css";

export default function SearchPage(){

  const {companies, loading, search }=useSearch();

  return(

    <div className={styles.page}>

      <h1>
      Search Companies
      </h1>

      <SearchInput
      onSearch={search}
      />

      {loading && (
      <p>
      Searching...
      </p>
      )}

      <CompanyTable
      companies={companies}
      />

    </div>
  );
}