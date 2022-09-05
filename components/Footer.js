import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={`footer py-5 ${styles.footerWrapper}`}>
      <div className="content has-text-centered is-size-7">
        <p>
          <strong>Music Stats</strong> by{" "}
          <a href="https://github.com/chakri68">
            {" "}
            <em> deltadev </em>
          </a>
          . The source code is licensed{" "}
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed{" "}
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
            CC BY NC SA 4.0
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
