import styles from "./TrackCard.module.css";
import SafeImage from "./SafeImage";
import Link from "next/link";
import { showModalImage } from "../public/scripts/Utils";
import Icon from "./Icon";

export default function TrackCard({ el, ...props }) {
  let displayData = {
    track_number: "Track Number",
    popularity: "Polularity Rating",
  };
  return (
    <div
      {...props}
      className={`box is-inline-flex is-flex-direction-row is-align-items-center albumCardFlex is-justify-content-space-around px-6 py-5 ${styles.trackCardFlex}`}
    >
      <div className={styles.imagePart}>
        {/* Images */}
        <div
          className="image hover-pointer is-128x128 skeleton-box"
          onClick={() => {
            showModalImage({
              imgSrc: el.album?.images[0]?.url,
              alt: `${el.name} image`,
            });
          }}
        >
          <SafeImage
            className="is-rounded"
            src={el.album?.images[0]?.url}
            alt={`${el.name} image`}
            layout="fill"
          />
        </div>
        {/* {el.album.images != 0 ? (
          <div className="image is-128x128 skeleton-box">
            <SafeImage
              className="is-rounded"
              src={el.album.images[0].url}
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
          className={`is-size-5 is-capitalized ${styles.trackTitle} is-flex is-align-items-center is-align-content-center`}
        >
          <p title="Track Details">
            <Link href={`/tracks/${el.id}`}>{el.name}</Link>
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
          <div className="block">
            <p title="Album" className="is-size-7 mt-2">
              <Link href={`/albums/${el.album.id}`}>
                <a>{el.album.name}</a>
              </Link>
            </p>
            {el.artists.map((artists) => (
              <a
                title="Artist"
                className="is-size-7 link mr-5"
                key={artists.id}
                href={artists.href}
                style={{
                  wordSpacing: "-0.1rem",
                }}
              >
                {artists.name}
              </a>
            ))}
          </div>
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
        {el.preview_url ? (
          <div className="container mt-4">
            <audio src={el.preview_url} controls></audio>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
