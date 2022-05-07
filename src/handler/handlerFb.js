
// parse sdUrl
exports.sdParse = function sdParse(data) {
  try {
    let sdRaw = /(sd_src:(.+?)),/.exec(data);
    let sdContentRaw = sdRaw[0].slice(0, -1);
    let sdUrl = /("https?:.*")/.exec(sdContentRaw)[0];
    return (sdUrl? { quality: "sd", url: JSON.parse(sdUrl) } : null);
  } catch (err) {
    console.log("sd-parse", err.message);
    return null;
  }
};

// parse hdUrl
exports.hdParse = function hdParse(data) {
  try {
    let hdRaw = /(hd_src:(.+?)),/.exec(data);
    if (hdRaw == null) return null;
    let hdContentRaw = hdRaw[0].slice(0, -1);
    let hdUrl = /("https?:.*")/.exec(hdContentRaw)[0];
    return (hdUrl? { quality: "hd", url: JSON.parse(hdUrl) } : null);
  } catch (err) {
    // console.log("hd-parse", err.message);
    return null;
  }
};

// parse thumbnail
exports.thumbnailParse = function thumbnailParse(data) {
  try {
    let thumbnailRaw = /"og:image"\s*content=(.+?)\s/.exec(data);
    let thumbnailContentRaw = /("https?:.*")/.exec(
      thumbnailRaw[0].split(" ")[1]
    );
    let thumbnailUrl = thumbnailContentRaw[0].replace(/&amp;/g, "&");
    return JSON.parse(thumbnailUrl);
  } catch (err) {
    // console.log("thumbnail-parse", err.message);
    return null;
  }
};

// parse title
exports.titleParse = function titleParse(data) {
  try {
    let titleRaw = /("og:title"\s*content=(.+?)\s*>)/.exec(data)[0];
    let titleContentRaw = /(content=(.+?)\s*>)/.exec(titleRaw)[0].slice(0, -3);
    let titleUrl = titleContentRaw.split("=")[1];
    return JSON.parse(titleUrl);
  } catch (err) {
    // console.log("title-parse", err.message);
    return null;
  }
};
