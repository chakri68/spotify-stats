import SafeImage from "./SafeImage";
import styles from "./AlbumCard.module.css";
import Link from "next/link";
import Icon from "./Icon";
import { showModalImage } from "../public/scripts/Utils";

export default function AlbumCard({ el, ...props }) {
  let displayData = {
    total_tracks: "Total Tracks",
    release_date: "Released On",
  };

  return (
    <div
      {...props}
      className={`box is-inline-flex is-flex-direction-row is-align-items-center albumCardFlex is-justify-content-space-around px-6 py-5 ${styles.albumCardFlex}`}
    >
      <div className={styles.imagePart}>
        {/* Images */}
        <div
          className="image hover-pointer is-128x128 skeleton-box"
          onClick={() => {
            showModalImage({
              imgSrc: el.images[0]?.url,
              alt: `${el.name} image`,
            });
          }}
        >
          <SafeImage
            className="is-rounded"
            src={el.images[0]?.url}
            alt={`${el.name} image`}
            layout="fill"
          />
        </div>
        {/* {el.images.length != 0 ? (
          <div className="image is-128x128 skeleton-box">
            <SafeImage
              className="is-rounded"
              src={el.images[0].url}
              alt={`${el.name} image`}
              layout="fill"
            />
          </div>
        ) : (
          ""
        )} */}
      </div>
      <div className={styles.contentPart}>
        <div
          className={`is-size-5 is-capitalized ${styles.albumTitle} is-flex is-align-items-center is-align-content-center`}
        >
          <p title="Album Details">
            <Link href={`/albums/${el.id}`}>{el.name}</Link>
          </p>
          <div className="extLinks">
            {el.external_urls.hasOwnProperty("spotify") ? (
              <Icon
                url={el.external_urls.spotify}
                iconClass="fa-brands fa-spotify"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="block">
          {el.artists.map((artists) => (
            <a
              className="is-size-7 link mr-5"
              key={artists.id}
              style={{
                wordSpacing: "-0.1rem",
              }}
              target="_blank"
              href={
                artists.external_urls.spotify
                  ? artists.external_urls.spotify
                  : ""
              }
              rel="noreferrer"
            >
              {artists.name}
            </a>
          ))}
        </div>
        <div className="block">
          {Object.keys(displayData).map((dataName) => {
            if (el.hasOwnProperty(dataName)) {
              return (
                <p key={dataName} className="is-capitalized is-size-7">
                  {displayData[dataName]}: {el[dataName]}
                </p>
              );
            } else {
              return "";
            }
          })}
        </div>
      </div>
    </div>
  );
}
