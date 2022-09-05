import styles from "./Icon.module.css";

export default function Icon({ url, iconClass, ...props }) {
  return (
    <a
      target="_blank"
      href={url}
      {...props}
      className={`is-inline-flex ${styles.extLinkTag} ${props?.className}`}
      rel="noreferrer"
    >
      <span className={`icon is-small ${styles.spotifyIcon}`}>
        <i className={iconClass}></i>
      </span>
    </a>
  );
}
