import styles from "./Footer.module.css"

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <div className={styles.content}></div> */}
      <p className={styles.copy}>
        Designed & Built by <span>💙 Mehdi ✨</span> — 2025
      </p>
    </footer>
  );
}

export default Footer