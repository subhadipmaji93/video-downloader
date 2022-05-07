// parse thumbnail
exports.thumbnailParse = function thumbnailParse(data){
    try{
        let thumbNailReg = /("thumbnail_src":(.+?)")/;
        let thumbnailRaw = thumbNailReg.exec(data)[0];
        let imageResult = /("https?:.*")/.exec(thumbnailRaw)[0];
        let imageUrl = imageResult.replace(/\\u0026/g, "&");
        return JSON.parse(imageUrl);
    }catch(err){
        // console.log("insta-thumbnail-parse", err.message);
        return null;
    }
};

// parse video url
exports.videoParse = function videoParse(data){
    try{
        let videoReg = /("video_url":(.+?)")/;
        let videoRaw = videoReg.exec(data)[0];
        let videoResult = /("https?:.*")/.exec(videoRaw)[0];
        let videoUrl = videoResult.replace(/\\u0026/g, "&");
        return { quality:"sd", url: JSON.parse(videoUrl) };
    }catch(err){
        // console.log("insta-video-parse", err.message);
        return null;
    }
};

// parse title 
exports.titleParse = function titleParse(data){
    try{
        let titleReg = /("og:title"\s*content=(.+?)\s*>)/;
        let titleRaw = titleReg.exec(data)[0];
        let titleContentRaw = /(content=(.+?)\s*>)/.exec(titleRaw)[0].slice(0, -3);
        let title = titleContentRaw.split("=")[1];
        return JSON.parse(title);
    }catch(err){
        // console.log("insta-title-parse", err.message);
        return null;
    }
};