const axios = require("axios");
const youtubeDl = require("youtube-dl-exec");
const handlerFb = require("./handlerFb");
const handlerYt = require("./handlerYt");
const handlerInsta = require("./handlerInsta");


exports.handlerYoutube = async function (url) {
  let composeUrl = `https://www.youtube.com/watch?v=${handlerYt.extractYoutubeID(
    url
  )}`;
  let streamData = {};
  let dataObj = [];
  await youtubeDl(composeUrl, handlerYt.youtubeDlOption)
    .then((res) => {
      streamData["thumbnail"] = res.thumbnail;
      streamData["title"] = res.title;
      for (var obj of res.formats) {
        if (obj.ext == "mp4") {
          if (obj.vcodec.endsWith("E")) {
            dataObj.push({
              url: obj.url,
              quality: "sd",
            });
          }
          if (obj.vcodec.endsWith("F")) {
            dataObj.push({
              url: obj.url,
              quality: "hd",
            });
          }
        }
      }
      streamData["data"] = dataObj;
    })
    .catch((err) => (streamData = null));
  return streamData;
};

exports.handlerFacebook = async function (url) {
  let streamData = {};
  let dataObj = [];

  await axios
    .get(url)
    .then((res) => res.data)
    .then((data) => {
      //thumbnail image checking
      // If thumbnailParse return null assume that requested url not valid or facebook has change it's pattern or it's a private video
      let thumbnailData = handlerFb.thumbnailParse(data);
      console.log(thumbnailData);
      if (!thumbnailData) {
        streamData = null;
        return;
      }
      streamData["thumbnail"] = thumbnailData;

      // title checking
      let titleData = handlerFb.titleParse(data);
      if (titleData) streamData["title"] = titleData;

      // sd src checking
      let sdData = handlerFb.sdParse(data);
      if (sdData) dataObj.push(sdData);

      // hd src checking
      let hdData = handlerFb.hdParse(data);
      if (hdData) dataObj.push(hdData);

      // if dataObj is empty so there is no reason to send Streamdata object
      console.log(dataObj);
      if (dataObj.length === 0) {
        streamData = null;
        return;
      }
      streamData["data"] = dataObj;
    })
    .catch((err) => {
      // console.log("main-fb-handler", err.message);
      streamData = null;
    });
  console.log("Compose-data", streamData);
  return streamData;
};

exports.handlerInsta = async function(url){
  let streamData = {};
  let dataObj = [];

  await axios
  .get(url)
  .then((res)=>res.data)
  .then((data)=>{

    // thumbnail image checking
    // If thumbnailParse return null assume that requested url not valid or Instagram has change it's pattern or it's a private video.
    let thumbnailData = handlerInsta.thumbnailParse(data);
    if(!thumbnailData){
      streamData = null;
      return;
    }
    streamData["thumbnail"] = thumbnailData;

    // video src checking
    let videoData = handlerInsta.videoParse(data);
    if(videoData) dataObj.push(videoData);

    // title src checking
    let titleData = handlerInsta.titleParse(data);
    if(titleData) streamData["title"] = titleData;

    // if dataObj is empty so there is no reson to send Streamdata object
    if (dataObj.length === 0) {
      streamData = null;
      return;
    }

    streamData["data"] = dataObj;
  }).catch((err)=>{
    // console.log("main-insta-handler", err.message);
    streamData = null;
  });
  // console.log("Compose-data-insta", streamData);
  return streamData;
};