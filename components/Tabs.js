import { useState } from "react";

import Pagination from "./Pagination";

export default function Tabs({ stages }) {
  let [stage, setStage] = useState(Object.keys(stages)[0]);
  function stageManager(e) {
    setStage(e.currentTarget.dataset.target);
  }

  return (
    <div className="Tab">
      <div className="tabs is-boxed">
        <ul>
          {Object.keys(stages).map((key) => {
            return (
              <li
                onClick={(e) => {
                  stageManager(e);
                }}
                data-target={key}
                key={key}
                className={key === stage ? "is-active" : ""}
              >
                {stages[key].tabListItem}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="stage container">
        <p className="title is-capitalized">{stage}</p>
        {stage && (
          <Pagination
            key={stage}
            total={stages[stage]?.total}
            stage={{ stageName: stage, url: stages[stage]?.typeBaseLinks }}
            initJSX={stages[stage].content}
          />
        )}
      </div>
    </div>
  );
}
