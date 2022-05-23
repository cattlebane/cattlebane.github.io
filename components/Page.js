import styles from "@styles/components/page.module.scss";

const Page = (props) => {
  return (
    <main className={styles.page}>
      {props.title ? <h1 className={styles["page-headline"]}>{props.title}</h1> : ""}
      {props.children}
    </main>
  );
};

export default Page;
