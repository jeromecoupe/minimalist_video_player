// selectors
const SELECTORS = {
  player: ".js-videoplayer",
  placeholder: ".js-videoplaceholder",
  link: ".js-videolink",
  template: ".js-videotemplate",
};

/**
 * Check if HTML templates are supprted
 * @returns
 */
function supportsTemplate() {
  return "content" in document.createElement("template");
}

/**
 * Build iframe src value
 * @param {String} videoService
 * @param {String} videoId
 * @returns {String} src url for iframe
 */
function getIframeSrc(videoService, videoId) {
  let iframeSrc = "";
  if (videoService === "youtube") {
    iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (videoService === "vimeo") {
    iframeSrc = `https://player.vimeo.com/video/${videoId}?color=e76c34&title=0&byline=0&portrait=0&autoplay=1`;
  }
  return iframeSrc;
}

/**
 * Get all players in the page
 * Swap the placeholder image and link for a video iframe
 */
function init() {
  // cut the mustard test
  if (!supportsTemplate()) {
    console.log("Your browser does not support the template tag");
    return;
  }

  // get all players
  const players = Array.from(document.querySelectorAll(SELECTORS.player));

  // loop through players
  players.forEach((player) => {
    // get values
    const service = player.dataset.videoService;
    const id = player.dataset.videoId;

    // checks
    if (service !== "youtube" && service !== "vimeo") return;
    if (!id) return;

    // load iframe template
    const template = player.querySelector(SELECTORS.template);
    const templateContent = document.importNode(template.content, true);

    // prepare iframe src and check
    const iframeSrc = getIframeSrc(service, id);
    if (iframeSrc === "") return;

    // add src to iframe
    const iframe = templateContent.querySelector("iframe");
    iframe.src = iframeSrc;

    // get link and placeholder
    const placeholder = player.querySelector(SELECTORS.placeholder);
    const link = player.querySelector(SELECTORS.link);

    // when link is clicked,
    // replace placeholder with template
    link.addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        placeholder.replaceWith(templateContent);
      },
      false
    );
  });
}

export default init;
