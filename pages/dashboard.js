import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";
import MediaObject from "../components/MediaObject";
import Icon from "../components/Icon";
import AlbumCard from "../components/AlbumCard";
import TrackCard from "../components/TrackCard";
import ArtistCard from "../components/ArtistCard";
import { checkTokenFromLS } from "../public/scripts/Utils";

export default function Dashboard() {
  let [userData, setUserData] = useState(null);
  let [topData, setTopData] = useState({
    tracks: null,
    artists: null,
    reRender: false,
  });
  let router = useRouter();
  let userAuth, session_token;
  if (typeof window !== "undefined") {
    userAuth = localStorage.getItem("user-auth");
    session_token = localStorage.getItem("session_token");
  }
  let showData = { followers: { total: "Followers" }, country: "Country" };
  useEffect(() => {
    if (
      !localStorage.getItem("user-auth") ||
      !checkTokenFromLS({ key: "expires_at" })
    ) {
      router.replace("/login");
    } else {
      fetchUserData({ token: session_token });
      fetchTop(["artists", "tracks"]);
    }
  }, []);

  async function fetchTop(types) {
    try {
      let currTop = {};
      await Promise.all(
        types.map(async (type) => {
          let res = await fetch(`https://api.spotify.com/v1/me/top/${type}`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("session_token")}`,
            },
          });
          let data = await res.json();
          currTop[type] = data;
        })
      );
      setTopData({ ...currTop, reRender: !topData.reRender });
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchUserData({ token }) {
    try {
      let res = await fetch("https://api.spotify.com/v1/me", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      if (data && !data.hasOwnProperty("error")) {
        setUserData(data);
      } else {
        router.push("login/error");
      }
    } catch (err) {
      router.push("login/error");
    }
  }

  return (
    <>
      <Navbar />
      {userData ? (
        <>
          <section className="hero is-medium has-background-info-dark">
            <div
              className={`hero-body is-flex is-align-items-center is-justify-content-space-evenly ${styles.heroBody}`}
            >
              <div className={styles.intro}>
                <p className="title">
                  Welcome,{" "}
                  <a
                    className="hover-pointer has-text-primary"
                    target="_blank"
                    href={userData.external_urls?.spotify || ""}
                    rel="noreferrer"
                  >
                    <em>{userData.display_name}</em>
                  </a>
                  !
                </p>
                <p className="subtitle is-size-6">{userData.email}</p>
              </div>
              <div
                className={`container has-background-info-dark ${styles.detailsCard}`}
              >
                <MediaObject
                  src={userData.images?.length ? userData.images[0]?.url : ""}
                  content={
                    <div>
                      <p className="mb-4">
                        <strong className="mr-2">
                          {userData.display_name}
                        </strong>
                        <Icon
                          url={userData.external_urls?.spotify}
                          className="not-link"
                          iconClass="fa-brands fa-spotify"
                        />
                      </p>
                      {Object.keys(showData).map((key) => {
                        let data = userData[key];
                        let c = showData[key];
                        while (typeof c == "object") {
                          data = data[Object.keys(c)[0]];
                          c = c[Object.keys(c)[0]];
                        }
                        return (
                          <p className="mb-1 is-size-7" key={data}>
                            {c}: {data}
                          </p>
                        );
                      })}
                    </div>
                  }
                />
              </div>
            </div>
          </section>
          <div className="container my-5">
            <div className="tile is-ancestor">
              <div className="tile is-4 is-vertical is-parent">
                <div className="tile is-child box">
                  <p className="title">Most Played Artist</p>
                  <div className="is-flex is-justify-content-center">
                    {topData && topData.artists?.items.length > 0 ? (
                      <ArtistCard
                        style={{ flexGrow: "0" }}
                        key={topData.artists.href}
                        el={topData.artists.items[0]}
                      />
                    ) : (
                      "You have no top artists..."
                    )}
                  </div>
                </div>
                {/* <div className="tile is-child box">
                  <p className="title">Two</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin ornare magna eros, eu pellentesque tortor vestibulum
                    ut. Maecenas non massa sem. Etiam finibus odio quis feugiat
                    facilisis.
                  </p>
                </div> */}
              </div>
              <div className="tile is-parent">
                <div className="tile is-child box">
                  <p className="title">Most Played Track</p>
                  <div
                    className="is-flex is-align-items-center"
                    style={{ height: "100%" }}
                  >
                    {topData && topData.tracks?.items.length > 0 ? (
                      <TrackCard
                        style={{ flexGrow: "0" }}
                        key={topData.tracks.href}
                        el={topData.tracks.items[0]}
                      />
                    ) : (
                      "You have no top tracks..."
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
      <Footer />
    </>
  );
}

// {
//   "country": "string",
//   "display_name": "string",
//   "email": "string",
//   "explicit_content": {
//     "filter_enabled": true,
//     "filter_locked": true
//   },
//   "external_urls": {
//     "spotify": "string"
//   },
//   "followers": {
//     "href": "string",
//     "total": 0
//   },
//   "href": "string",
//   "id": "string",
//   "images": [
//     {
//       "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n",
//       "height": 300,
//       "width": 300
//     }
//   ],
//   "product": "string",
//   "type": "string",
//   "uri": "string"
// }
