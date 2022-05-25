import Card from "./Card";

import styles from "@styles/components/bioCard.module.scss";

const BioCard = (props) => {
  const { name, label, image, headline, summary } = props.basics;

  return (
    <Card className={styles.bioCard}>
      <ul>
        {/* <li>
            <h1>{name || ""}</h1>
        </li> */}
        <li className={styles.headline}>
          <img src={image || ""} alt="hero image" style={{ width: "100px" }} />
          <div className={styles.copyBlock}>
            <h2>{label || ""}</h2>
            <h3>{headline || ""}</h3>
          </div>
        </li>
        <li></li>
        <li>
          <p>{summary || ""}</p>
        </li>
      </ul>
    </Card>
  );
};

export default BioCard;
