import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import TrackCard from "./TrackCard";
import Tabs from "./Tabs";
import { useEffect } from "react";

export default function ResultsList({
  searchData: { searchTerm, ...searchData },
}) {
  useEffect(() => {
    // Scroll into view
    document.querySelector("div.searchResults").scrollIntoView();
  }, []);
  console.log({ searchData, searchTerm });
  let fontAwesomeNames = {
    albums: { size: "small", className: "fa-solid fa-record-vinyl" },
    artists: { size: "small", className: "fa-solid fa-user" },
    tracks: { size: "small", className: "fa-solid fa-music" },
  };
  let stagesObj = {};
  // type: ["artists", "tracks", "albums"]
  Object.keys(searchData).map((type) => {
    stagesObj[type] = {
      tabListItem: (
        <a>
          <span className={`icon is-${fontAwesomeNames[type].size}`}>
            <i
              className={fontAwesomeNames[type].className}
              aria-hidden="true"
            ></i>
          </span>
          <span className="is-primary is-capitalized">{type}</span>
        </a>
      ),
      content: (
        <div className="container mt-4 is-flex is-flex-wrap-wrap" key={type}>
          {type == "artists" &&
            searchData[type].items.map((el) => {
              return <ArtistCard key={el.id} el={el} />;
            })}
          {type == "tracks" &&
            searchData[type].items.map((el) => {
              return <TrackCard key={el.id} el={el} />;
            })}
          {type == "albums" &&
            searchData[type].items.map((el) => {
              return <AlbumCard key={el.id} el={el} />;
            })}
        </div>
      ),
      typeBaseLinks: searchData[type].href,
      total: searchData[type].total,
    };
  });

  return (
    <div className="searchResults container">
      <p className="title">Search Results</p>
      <Tabs key={stagesObj} stages={stagesObj} />
    </div>
  );
}
