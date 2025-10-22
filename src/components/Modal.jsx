import styles from "./Modal.module.css";

function Modal({ message, onConfirm, onCancel }) {
  return (
     <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.confirm} onClick={onConfirm}>Yes</button>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Modal