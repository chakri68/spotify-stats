import { useState } from "react";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import TrackCard from "./TrackCard";

export default function Pagination({ total, stage, initJSX }) {
  const TOKEN = localStorage.getItem("session_token");
  let pageSize = new URL(stage.url).searchParams.get("limit");
  let pageData = [initJSX];
  let totalPages = Math.ceil(total / pageSize);
  let [currPage, setCurrPage] = useState(1);
  let [pageJSX, setPageJSX] = useState(pageData[0]);
  async function pageJSXHandler(page) {
    document.querySelector("div.searchResults")?.scrollIntoView();
    if (pageData[parseInt(page) - 1]) {
      setPageJSX(pageData[parseInt(page) - 1]);
      return;
    }
    const paramObj = {
      offset: page * pageSize,
    };
    let url = new URL(stage.url);
    ["offset"].map((nonReq) => url.searchParams.delete(nonReq));
    Object.keys(paramObj).map((key) =>
      url.searchParams.append(key, paramObj[key])
    );

    let res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    let data = await res.json();
    let type = Object.keys(data)[0];
    pageData[parseInt(page) - 1] = (
      <div className="container mt-4 is-flex is-flex-wrap-wrap" key={type}>
        {type == "artists" &&
          data[type].items.map((el) => {
            return <ArtistCard key={el.id} el={el} />;
          })}
        {type == "tracks" &&
          data[type].items.map((el) => {
            return <TrackCard key={el.id} el={el} />;
          })}
        {type == "albums" &&
          data[type].items.map((el) => {
            return <AlbumCard key={el.id} el={el} />;
          })}
      </div>
    );
    setPageJSX(pageData[parseInt(page) - 1]);
  }
  /**
   * @param  {boolean} isNext
   */
  function handlePageMotion(isNext) {
    if (isNext) {
      pageChange(document.querySelector(`li[data-page='${currPage + 1}']`));
    } else {
      pageChange(document.querySelector(`li[data-page='${currPage - 1}']`));
    }
  }

  function pageChange(e) {
    let ePage = e.dataset?.page;
    if (ePage && currPage != ePage) {
      setCurrPage(ePage);
      pageJSXHandler(ePage);
    }
  }
  return (
    <div className="Page">
      {pageJSX}
      <nav
        className="pagination mb-5 mt-3"
        role="navigation"
        aria-label="pagination"
      >
        <a
          className={`pagination-previous ${
            currPage == 1 ? "is-disabled" : ""
          }`}
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("is-disabled"))
              handlePageMotion(false);
          }}
        >
          Previous
        </a>
        <a
          className={`pagination-next ${
            totalPages == currPage ? "is-disabled" : ""
          }`}
          onClick={(e) => {
            if (!e.currentTarget.classList.contains("is-disabled"))
              handlePageMotion(true);
          }}
        >
          Next page
        </a>
        <ul className="pagination-list">
          {[...Array(totalPages)].map((x, ind) => {
            return (
              <li
                key={ind}
                onClick={(e) => {
                  pageChange(e.currentTarget);
                }}
                data-page={ind + 1}
              >
                <a
                  className={`pagination-link ${
                    ind + 1 == currPage ? "is-current" : ""
                  }`}
                  aria-label={`Goto page ${ind + 1}`}
                  aria-current={ind + 1 == currPage ? "page" : ""}
                >
                  {ind + 1}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
