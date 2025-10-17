// import { IoSearchSharp } from "react-icons/io5";
import styles from "./Search.module.css"


function Search({ search,setSearch, searchHandler }) {
  return (
    <div className={styles.container}>
     <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
    </div>
  );
}

export default Search