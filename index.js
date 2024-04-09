const dataFolder = './data';

const fs = require('fs');

let counter = 0;
const readFilesInDirectory = (folder, callback) => {
  fs.readdir(folder, (err, files) => {
    // console.log('folder :', folder);
    // console.log('files :', files);

    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < files.length; i++) {
        console.log('file lenght', files.length);
        fileOrDirectory(
          `${folder}/${files[i]}`,
          files[i],
          folder,
          callback,
          files.length
        );
      }
      // console.log('folder :', folder);
    }
  });
};

const readFile = (file, folder, callback, length) => {
  // files.forEach((file) => {
  let result = [];

  fs.readFile(`${folder}/${file}`, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
    } else {
      counter++;
      console.log('counter :', counter);
      result.push(data);
      console.log('result :', result);
      console.log('length', length);

      // if (count === length) {
      //   console.log('result DONE:', result);
      //   callback(result);
      // }
    }
  });
  // });
};

const fileOrDirectory = (path, files, folder, callback, length) => {
  // console.log('counter :', counter);
  fs.stat(path, (err, stats) => {
    if (err) {
      console.log(err);
    }
    if (stats.isFile()) {
      readFile(files, folder, callback, length);
    } else if (stats.isDirectory()) {
      fs.readdir(path, (err, file) => {
        if (err) {
          console.log(err);
        }

        fs.stat(`${path}/${file}`, (err, stat) => {
          if (err) {
            console.log(err);
          }
          if (stat.isFile()) {
            readFile(file, `${folder}/${files}`, callback, length);
          }
        });
      });
    }
  });
};

// fileOrDirectory(dataFolder);

readFilesInDirectory(dataFolder, (data) => {
  console.log('data cb', data);
});
