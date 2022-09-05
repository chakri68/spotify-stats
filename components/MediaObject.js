import SafeImage from "./SafeImage";

export default function MediaObject({ src, content }) {
  return (
    <article
      className="box media has-background-dark is-align-items-center is-justify-content-space-evenly"
      style={{ width: "fit-content", minWidth: "300px" }}
    >
      <figure className="media-left" style={{ flexBasis: "1" }}>
        <p className="image is-64x64">
          <SafeImage
            className="is-rounded"
            src={src}
            alt="User Image"
            layout="fill"
          />
        </p>
      </figure>
      <div
        className="media-content"
        style={{ flex: "0", flexBasis: "fit-content" }}
      >
        <div className="content ">{content}</div>
      </div>
    </article>
  );
}
