import styles from "./ArtistCard.module.css";
import Icon from "./Icon";
import SafeImage from "./SafeImage";
import { showModalImage } from "../public/scripts/Utils";

export default function ArtistCard({ el }) {
  let displayData = {
    Followers: el.followers.total,
    "Popularity Rating": el.popularity,
  };
  return (
    <div
      className={`box is-inline-flex is-flex-direction-column is-justify-content-space-around ${styles.artistCardFlex}`}
    >
      <div
        className={`is-size-5 is-capitalized ${styles.artistTitle} is-flex is-align-items-center is-align-content-center`}
      >
        <p className="is-size-5 is-capitalized">{el.name}</p>
        {el.external_urls?.spotify ? (
          <Icon
            url={el.external_urls.spotify}
            iconClass="fa-brands fa-spotify"
          />
        ) : (
          ""
        )}
      </div>
      {el.genres.length > 5
        ? el.genres.slice(0, 5).map((genre) => (
            <a
              className="is-size-7 link mr-5"
              key={genre}
              style={{
                wordSpacing: "-0.1rem",
              }}
            >
              {genre}
            </a>
          ))
        : el.genres.slice(0, 5).map((genre) => (
            <a
              className="is-size-7 link mr-5"
              key={genre}
              style={{
                wordSpacing: "-0.1rem",
              }}
            >
              {genre}
            </a>
          ))}
      {/* Images */}
      <div
        className="image hover-pointer is-128x128 m-5 skeleton-box"
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
        <div className="image is-128x128 m-5 skeleton-box">
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
      <div className="block">
        {Object.keys(displayData).map((dataText) => {
          if (displayData[dataText])
            return (
              <p key={dataText} className="is-captalized is-size-7">
                {dataText}: {displayData[dataText]}
              </p>
            );
          else return "";
        })}
      </div>
    </div>
  );
}
