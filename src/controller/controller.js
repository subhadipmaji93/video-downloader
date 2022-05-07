const handler = require("../handler/handlerMain");

exports.getYoutube = (req, res) => {
  handler
    .handlerYoutube(req.query.url)
    .then((resp) => {
      if (resp == null)
        return res.status(404).json({
          success: false,
          message: "Video Not Found!",
        });
      
        res.status(200).json({
        sucess: true,
        title: resp.title,
        thumbnail: resp.thumbnail,
        data: resp.data,
      });
    })
    .catch((err) => {
      res.status(500).json({ sucess: false, message: "Something Went Wrong!" });
    });
};

exports.getFacebook = (req, res) => {
  handler
    .handlerFacebook(req.query.url)
    .then((resp) => {
      if (resp === null)
        return res.status(404).json({
          success: false,
          message: "Video Not Found!",
        });

      res.status(200).json({
        success: true,
        title: resp.title,
        thumbnail: resp.thumbnail,
        data: resp.data,
      });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: "Something Went Wrong!" })
    );
};

exports.getInstagram = (req, res)=>{
  handler
    .handlerInsta(req.query.url)
    .then((resp)=>{
      if(resp === null) return res.status(404).json({
        success: false, 
        message: "Video Not Found!",
      });
      res.status(200).json({
        success: true,
        title: resp.title || null,
        thumbnail: resp.thumbnail,
        data: resp.data,
      });
    })
    .catch((err)=>
      res.status(500).json({success: false, message: "Something Went Wrong!"})
    );
};