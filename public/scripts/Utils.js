/**
 * @param  {string | object} str The Object or JSON string
 */ export class JP {
  constructor(str) {
    if (typeof str == "string") {
      this.obj = JSON.parse(str);
    } else {
      this.obj = str;
    }
  }
  toString() {
    return JSON.stringify(this.obj);
  }
  get(key) {
    return this.obj[key];
  }
  store(o) {
    for (let i in o) {
      this.obj[i] = o[i];
    }
  }
}

// How we're storing the session-data in localStorage

const session_token = {
  token: "token_string",
};

/**
 * @param  {string} url the url
 * @param  {string[]} reqParams=null required props (all if not given)
 * @param  {string[]} notReqParams=null non-required props
 */
export function getReqParams(url, reqParams = null, notReqParams = null) {
  let returnObj = {};
  let urlObj = new URL(url);
  let params = urlObj.searchParams;
  params = paramsToObject(params);
  if (reqParams == null && notReqParams == null) {
    Object.keys(params).map((key) => (returnObj[key] = params[key]));
    return returnObj;
  }
  if (notReqParams == null) {
    reqParams.map((req) => {
      returnObj[req] = params[req];
    });
    return returnObj;
  } else {
    Object.keys(params).map((key) => {
      if (!notReqParams.includes(key)) returnObj[key] = params[key];
    });
    return returnObj;
  }
}

function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tupple
    result[key] = value;
  }
  return result;
}
/**
 * @param  {{imgSrc: string, width: number?, height: number?, parent: HTMLElement?, alt: string? }} imageDetails
 * @param {} imgSrc The src url of the image
 * @param  {} width image width
 * @param  {} height image height
 */
export function showModalImage({
  imgSrc,
  width = 600,
  height = 600,
  parent = null,
  alt = "",
}) {
  if (document.querySelector("div.injected-modal")) {
    document.querySelector(
      "div.injected-modal"
    ).innerHTML = `<div class="modal-background" onclick="removeModal()">
  <div class="modal-content is-clipped modal-box">
    <p class="image is-square">
      <img src="${imgSrc}" alt="${alt}">
    </p>
  </div>

  <button class="modal-close is-large" aria-label="close" onclick="removeModal()"></button></div>`;
    document.querySelector("div.injected-modal").classList.add("is-active");
    document.querySelector("div.injected-modal").classList.remove("out");
    document.body.classList.add("modal-active");
    return;
  }
  let modal = document.createElement("div");
  modal.id = "modal-container";
  modal.classList += "modal is-active injected-modal anim-reveal";
  modal.innerHTML = `<div class="modal-background" onclick="removeModal()">
  <div class="modal-content is-clipped modal-box">
    <p class="image is-square">
      <img src="${imgSrc}" alt="${alt}">
    </p>
  </div>

  <button class="modal-close" aria-label="close" onclick="removeModal()"></button></div>`;
  if (parent) {
    parent.appendChild(modal);
  } else {
    document.body.appendChild(modal);
  }
}
