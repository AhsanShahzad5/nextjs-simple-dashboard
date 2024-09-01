import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>ahsan@dev</div>
      <div className={styles.text}>
        Ahsan Software Development Agency © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;