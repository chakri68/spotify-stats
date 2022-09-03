import styles from "./Icon.module.css";

export default function Icon({ url, iconClass }) {
  return (
    <a
      target="_blank"
      href={url}
      className={`is-inline-flex ${styles.extLinkTag}`}
      rel="noreferrer"
    >
      <span className={`icon is-small ${styles.spotifyIcon}`}>
        <i className={iconClass}></i>
      </span>
    </a>
  );
}
