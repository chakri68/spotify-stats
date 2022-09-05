import { useEffect, useState } from "react";
import ResultsList from "../components/ResultsList";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  let [searchData, setSearchData] = useState([]);
  let [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("session_token") &&
      localStorage.getItem("expires_at") &&
      new Date(Date.now()) < new Date(localStorage.getItem("expires_at"))
    ) {
      return;
    }
    fetch("/api/token")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let date = new Date(Date.now());
        localStorage.setItem("session_token", data.access_token);
        localStorage.setItem(
          "expires_at",
          date.setMinutes(
            date.getMinutes + Math.floor(parseInt(date.expires_in) / 60)
          )
        );
      })
      .catch((err) => console.warn({ ERROR: err }));

    document.getElementById("submitBtn").disabled = true;
  }, []);

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
          Authorization: `Bearer ${localStorage.getItem("session_token")}`,
        },
      }
    );
    let data = await res.json();
    if (data) {
      setSearchData({ ...data, searchTerm: query });
    } else {
      setSearchData([]);
      setNotFound(true);
    }
    callback();
  }

  return (
    <>
      <Head>
        <title>Spotify Stats</title>
      </Head>
      <Navbar />
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
                placeholder="Search"
              />
              <div className="type is-flex is-flex-direction-row is-flex-wrap is-justify-content-space-around is-align-content-center mb-5">
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
                  document.querySelector("div.searchResults")?.scrollIntoView();
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
        <ResultsList key={searchData.searchTerm} searchData={searchData} />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}
