import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import styles from "@styles/components/globalNav.module.scss";
import GlobalNavContext from "../store/globalnav-context";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const globalNavCtx = useContext(GlobalNavContext);

  useEffect(() => {
    const sectionID = router.pathname.split("/")[1];
    if (sectionID === globalNavCtx.currentSection) {
      return;
    }
    globalNavCtx.updateSection(sectionID);
  }, [router, globalNavCtx]);

  useEffect(() => {
    const allItems = document.querySelectorAll(".nav-item");
    const activeItemID = `nav-${globalNavCtx.currentSection}`;
    const activeItem = document.querySelector(`#${activeItemID}`);
    Array.prototype.forEach.call(allItems, (curItem) => {
      if (curItem.id === activeItemID) {
        curItem.classList.add(`${styles["active-nav-section"]}`);
      } else {
        curItem.classList.remove(`${styles["active-nav-section"]}`);
      }
    });
  }, [globalNavCtx.currentSection]);

  useEffect(() => {
    if (navItems) {
      return;
    }

    const dash = <span className={`${styles["nav-item-separator"]} ${styles["nav-item-grey"]}`}></span>;
    const navElements = navData.map((item, index) => {
      return (
        <li key={`nav-${item.id}`}>
          <Link href={`/${item.id}`}>
            <a id={`nav-${item.id}`} className={`nav-item ${styles["nav-item"]} ${styles["nav-item-grey"]}`}>
              {item.title}
            </a>
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
