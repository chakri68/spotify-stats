export default function MainCard({ getSearchData }) {
  return (
    <div
      className="card"
      style={{
        width: "500px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <header
        className="card-header "
        style={{
          borderBottom: "1px solid var(--primary)",
        }}
      >
        <p className="card-header-title is-justify-content-center">
          Get Song Details!
        </p>
      </header>
      <div className="card-content has-text-centered">
        <div className="content">
          <input
            type="text"
            name="Song Name"
            id="songName"
            className="input mb-4"
            placeholder="Song Name"
          />
          <button
            data-target="#songName"
            className="button is-primary"
            onClick={(e) =>
              getSearchData(
                document.querySelector(e.target.dataset.target).value
              )
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
