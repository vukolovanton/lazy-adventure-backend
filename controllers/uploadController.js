const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __basedir + '/public/maps/');
  },
  filename: function(req, file, cb) {
    const filename = req.headers['x-file-name'];
    cb(null, `${file.originalname}-${Date.now()}.png`);
  },
});

const upload = multer({ storage }).single('file');

async function handleUplaod(req, res) {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send('Something went wrong!');
      console.log(err);
    }
    res.send(req.file);
  });
}

async function handleDownloadSingleFile(req, res) {
  const fileName = req.params.name;
  const directoryPath = __basedir + '/public/maps/';
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: 'Could not download the file. ' + err,
      });
    }
  });
}

async function handleGetFilesList(req, res) {
  const directoryPath = __basedir + '/public/maps/';
  fs.readdir(directoryPath, function(err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: 'http://localhost:3001/public/maps/' + file,
      });
    });
    res.status(200).send(fileInfos);
  });
}

async function handleGetMonstersList(req, res) {
  const directoryPath = __basedir + '/public/monsters/';
  fs.readdir(directoryPath, function(err, files) {
    if (err) {
      res.status(500).send({
        message: 'Unable to scan files!',
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: 'http://localhost:3001/public/monsters/' + file,
      });
    });
    res.status(200).send(fileInfos);
  })
}

module.exports = {
  handleUplaod,
  handleDownloadSingleFile,
  handleGetFilesList,
  handleGetMonstersList,
};
