import { useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import { JP } from "../public/scripts/Utils";

export default function Home({ token }) {
  let [searchData, setSearchData] = useState([]);
  let [notFound, setNotFound] = useState(false);
  useEffect(() => {
    let obj = localStorage.getItem("session-token");
    if (obj) {
      let myObj = new JP(obj);
      myObj.store({ token: token });
    } else {
      localStorage.setItem(
        "session-token",
        new JP({ token: token }).toString()
      );
    }
    document.getElementById("submitBtn").disabled = true;
  }, [token]);

  function checkboxes() {
    let isdisabled = true;
    let typeBtns = document.querySelectorAll("div.type input[type='checkbox']");
    for (let btn of typeBtns) {
      if (btn.checked) {
        isdisabled = false;
        break;
      }
    }
    document.getElementById("submitBtn").disabled = isdisabled;
  }

  /**
   *
   * @param {String} query
   */
  async function getSearchData(
    {
      query: { value: query },
      artists: { checked: artists },
      tracks: { checked: tracks },
      albums: { checked: albums },
    },
    callback = () => {}
  ) {
    console.log({ query, artists, tracks, albums });
    let types = { artists, tracks, albums };
    let typeArr = [];
    let apiTypeNames = {
      artists: "artist",
      albums: "album",
      tracks: "track",
    };
    for (let type in types) {
      if (types[type]) typeArr.push(apiTypeNames[type]);
    }
    let res = await fetch(
      `https://api.spotify.com/v1/search?q=${query.replace(" ", "%20")}${
        typeArr.length != 0 ? "&type=" + typeArr.join(",") : ""
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let data = await res.json();
    if (data) {
      setSearchData(data);
    } else {
      setSearchData([]);
      setNotFound(true);
    }
    callback();
  }

  return (
    <>
      <div
        className="card"
        style={{
          width: "500px",
          position: "relative",
          left: "50%",
          margin: "150px 0px",
          transform: "translateX(-50%)",
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
            <form name="song-data">
              <input
                type="text"
                name="query"
                id="songName"
                className="input mb-4"
                placeholder="Song Name"
              />
              <div className="type is-flex is-flex-direction-row is-flex-wrap is-justify-content-space-around is-align-content-center pb-3">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-3"
                    name="albums"
                    onChange={checkboxes}
                  />
                  Albums
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-3"
                    name="tracks"
                    onChange={checkboxes}
                  />
                  Tracks
                </label>
                <label className="checkbox">
                  <input
                    type="checkbox"
                    className="mr-3"
                    name="artists"
                    onChange={checkboxes}
                  />
                  Artists
                </label>
              </div>
              <button
                id="submitBtn"
                data-form="song-data"
                className="button is-primary"
                onClick={async (e) => {
                  e.preventDefault();
                  e.target.classList.toggle("is-loading");
                  await getSearchData(
                    document.forms[e.target.dataset.form],
                    () => {
                      e.target.classList.toggle("is-loading");
                    }
                  );
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      {notFound == true && Object.keys(searchData).length === 0 ? (
        <div className="container">
          <p className="title">No Results Found...</p>
        </div>
      ) : (
        ""
      )}
      {notFound == false && Object.keys(searchData).length !== 0 ? (
        <ResultsList searchData={searchData} />
      ) : (
        ""
      )}
    </>
  );
}

export async function getServerSideProps() {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  let token = null;

  let res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  let data = await res.json();
  token = data.access_token;
  return {
    props: {
      token: token,
    },
  };
}
