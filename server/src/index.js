import express from 'express';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';

import image from './image.json';

const app = express();

app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  console.log(req.files);

  const file = req.files.file;

  file.mv(`../uploads/${file.name}`, err => {
    const index = 1 + Math.round(Math.random());

    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      colorizedPhoto: image[index],
    });
  });
});

app.post('/links', (req, res) => {
  setTimeout(() => {
    res.json([
      'https://picsum.photos/seed/18/380/340',
      'https://picsum.photos/seed/17/380/280',
      'https://picsum.photos/seed/14/260/300',
      'https://picsum.photos/seed/18/380/320',
      'https://picsum.photos/seed/17/360/320',
      'https://picsum.photos/seed/16/380/260',
      'https://picsum.photos/seed/12/220/260',
      'https://picsum.photos/seed/16/320/300',
      'https://picsum.photos/seed/15/240/360',
      'https://picsum.photos/seed/14/320/240',
      'https://picsum.photos/seed/14/240/300',
    ]);
  }, 1000);
});

app.post('/colorize', (req, res) => {
  const photos = req.body;

  const colorizedPhotos = photos.map(photo => ({
    id: photo.id,
    colorizedUrl: photo.originUrl + '?grayscale',
  }));

  setTimeout(() => {
    res.json(colorizedPhotos);
  }, 1000);
});

app.post('/guided', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  console.log(req.files);
  const points = JSON.parse(req.body.points);
  console.log('points', points);

  const file = req.files.file;

  file.mv(`../uploads/${file.name}`, err => {
    const index = 1 + Math.round(Math.random());

    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    setTimeout(() => {
      res.json({
        colorizedPhoto: image[index],
      });
    }, 2000);
  });
});

app.listen(9001, () => console.log('Server Started...'));
