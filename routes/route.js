const express = require("express");

const pdf = require("pdf-parse");

const aws = require("aws-sdk");

const router = express.Router();

aws.config.update({
  accessKeyId: "AKIAY3L35MCRVFM24Q7U",
  secretAccessKey: "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",
  region: "ap-south-1",
});

let uploadFile = async (file) => {
  return new Promise(function (resolve, reject) {
    let s3 = new aws.S3({ apiVersion: "2006-03-01" });

    var uploadParams = {
      ACL: "public-read",
      Bucket: "classroom-training-bucket",
      Key: "pdf/" + file.originalname,
      Body: file.buffer,
    };

    s3.upload(uploadParams, function (err, data) {
      if (err) {
        return reject({ error: err });
      }
      console.log(data);
      return resolve(data.Location);
    });
  });
};

router.get("/", (req, res) => {
  res.send("pdf parsing....");
});

router.post("/pdfConvert", async function (req, res) {
  let files = req.files;

  if (files && files.length > 0) {
    var uploadFileUrl = await uploadFile(files[0]);

    pdf(uploadFileUrl).then(function (data) {
      res.status(200).json({ pdfFile: data }).catch(err);
    });
  } else {
    return res.status(400).send({ status: false, msg: "image is required" });
  }
});


module.exports.router = router