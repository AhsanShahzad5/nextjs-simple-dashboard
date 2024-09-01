import Image from "next/image";
import styles from "./about.module.css";

export const metadata = {
  title: "About Page",
  description: "About description",
};


const AboutPage = () => {

  // console.log("lets check where it works")
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          Ultimate web solutions for your business.
        </h1>
        <p className={styles.desc}>
          We create the ultimate web solutions for your businesses.
          We believe in good ideas flexibility and precission We’re world’s Our
          Special Team best consulting & finance , real estate and all kinds of solution provider. We offer Wide range
          of web and software development services.
        </p>
        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>100+</h1>
            <p>Satisfied Clients</p>
          </div>
          <div className={styles.box}>
            <h1>50+</h1>
            <p>SAAS Products</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="/about.png"
          alt="About Image"
          fill
          className={styles.img}
        />
      </div>
    </div>
  );
};

export default AboutPage;