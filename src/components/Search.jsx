import { Search as SearchIcon } from "lucide-react";
import styles from "./Search.module.css"


function Search({ search,setSearch, searchHandler }) {
  return (
     <div className={styles.searchContainer}>
      <SearchIcon className={styles.icon} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        placeholder="Search contacts..."
        className={styles.input}
      />
    </div>
  );
}

export default Search