import styles from "@styles/components/card.module.scss";

const Card = (props) => {
  return (
    // <div className={styles.card} style={{ maxWidth: `${props.maxWidth || 600}px` }}>
    <div className={styles.card}>{props.children}</div>
  );
};

export default Card;
