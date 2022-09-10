import { useState } from "react";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import TrackCard from "./TrackCard";
import { range } from "../public/scripts/Utils";

export default function Pagination({
  total,
  stage,
  initJSX,
  toDisplayNum = 3,
  maxPages = 6,
}) {
  const TOKEN = localStorage.getItem("session_token");
  let pageSize = new URL(stage.url).searchParams.get("limit");
  let pageData = [initJSX];
  let totalPages = Math.ceil(total / pageSize);
  let [currPage, setCurrPage] = useState(1);
  let [pageJSX, setPageJSX] = useState(pageData[0]);
  let [pageNums, setPageNums] = useState(
    totalPages <= maxPages
      ? [[...range(maxPages, 1)]]
      : [
          [...range(toDisplayNum, 1)],
          [...range(toDisplayNum, totalPages - toDisplayNum + 1)],
        ]
  );
  async function pageJSXHandler(page) {
    document.querySelector("div.searchResults")?.scrollIntoView();
    if (pageData[parseInt(page) - 1]) {
      setPageJSX(pageData[parseInt(page) - 1]);
      return;
    }
    const paramObj = {
      offset: (parseInt(page) - 1) * pageSize,
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
  function handlePageNums(currPg) {
    let nums = [];
    range(toDisplayNum, 1).map((num) => {
      nums.push(num);
    });
    range(toDisplayNum, currPg - 1).map((num) => {
      if (num > 0 && num <= totalPages && !nums.includes(num)) nums.push(num);
    });
    range(toDisplayNum, totalPages - toDisplayNum + 1).map((num) => {
      if (!nums.includes(num)) nums.push(num);
    });
    let toRet = [];
    let currSequence = [];
    let pvNum = nums[0];
    for (let i of nums) {
      if (pvNum + 1 == i || pvNum == i) {
        currSequence.push(i);
        pvNum = i;
      } else {
        toRet.push(currSequence);
        currSequence = [i];
        pvNum = i;
      }
    }
    toRet.push(currSequence);
    setPageNums(toRet);
  }
  function pageChange(e) {
    let ePage = e.dataset?.page;
    if (ePage && currPage != ePage) {
      setCurrPage(parseInt(ePage));
      handlePageNums(ePage);
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
          {pageNums.map((arr, ind) => {
            return (
              <>
                {arr.map((ind) => {
                  return (
                    <li
                      key={ind}
                      onClick={(e) => {
                        pageChange(e.currentTarget);
                      }}
                      data-page={ind}
                    >
                      <a
                        className={`pagination-link ${
                          ind == currPage ? "is-current" : ""
                        }`}
                        aria-label={`Goto page ${ind}`}
                        aria-current={ind == currPage ? "page" : ""}
                      >
                        {ind}
                      </a>
                    </li>
                  );
                })}
                {ind !== pageNums.length - 1 ? (
                  <li>
                    <span className="pagination-ellipsis">&hellip;</span>
                  </li>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
