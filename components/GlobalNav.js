import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@styles/components/Header.module.scss";
import btnStyles from "@styles/components/button.module.scss";

const navData = [
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "about",
    title: "About",
  },
];

const GlobalNav = (props) => {
  const [navItems, setNatItems] = useState(null);

  useEffect(() => {
    if (navItems) {
      return;
    }

    const dash = <span className={`${styles["bread-crumb-separator"]} ${styles["bread-crumb-grey"]}`}></span>;
    const navElements = navData.map((item, index) => {
      return (
        <li key={`nav-${item.id}`}>
          <Link href={`/${item.id}`}>
            <a className={`${styles["bread-crumb"]} ${styles["bread-crumb-grey"]}`}>{item.title}</a>
          </Link>
          {index < navData.length - 1 ? dash : ""}
        </li>
      );
    });
    setNatItems(navElements);
  }, [navItems]);

  return <ul>{navItems}</ul>;
};

export default GlobalNav;
