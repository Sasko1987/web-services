const fs = require("fs");
const makeId = require("../pkg/strings");

const MAX_FILESIZE = 1024 * 1024;
const ALLOWED_FILETYPES = [
  "image/jpeg",
  "image/png",
  "image/pjpeg",
  "image/gif",
  "image/jpg",
];

function upload(req, res) {
  console.log(req.files);
  if (MAX_FILESIZE < req.files.document.size) {
    return res.status(400).send("File exceeds max file size");
  }

  if (!ALLOWED_FILETYPES.includes(req.files.document.mimetype)) {
    return res.status(400).send("File type not supported");
  }

  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;

  if (!fs.existsSync(userDirPath)) {
    fs.mkdirSync(userDirPath);
  }

  let fileName = `${makeId(6)}_${req.files.document.name}`;
  let filePath = `${userDirPath}/${fileName}`;

  req.files.document.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send("Internal Server error");
    }
    return res.status(201).send({ fileName: fileName });
  });
}

function download(req, res) {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  let filePath = `${userDirPath}/${req.params.filename}`;
  console.log(filePath);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("file not found");
  }
  res.download(filePath);
}

function readFiles(req, res) {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  console.log(userDirPath);

  fs.readdir(userDirPath, (err, files) => {
    if (err) {
      res.send(500).send("Internal server error");
    }
    let filenames = files.map((file) => file);
    res.status(200).send(filenames);
  });
}

function deleteFiles(req, res) {
  let userDir = `user_${req.auth.id}`;
  let userDirPath = `${__dirname}/../uploads/${userDir}`;
  let filePath = `${userDirPath}/${req.params.filename}`;

  fs.unlink(filePath, (err) => {
    if (err) {
      res.status(500).send("internal Server Error");
    }
  });

  fs.readdir(userDirPath, (err, files) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (files.length === 1) {
      fs.rmdir(userDirPath, (err) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }
        return res
          .status(200)
          .send("File was deleted and Empty Directorium is deleted");
      });
    }
    console.log(files.length);
    if (files.length !== 1) {
      res.status(200).send("File was deleted");
    }
  });
}

module.exports = { upload, download, readFiles, deleteFiles };
