import express from 'express';
import fileUpload from 'express-fileupload';
import axios from 'axios';

import image from './image.json';

const app = express();

app.use(express.json());

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

// --------------------------------------------------------------------------------------------------------------

const getBase64 = async url => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });

  const imageType = response.headers['content-type'];
  const base64 = Buffer.from(response.data, 'binary').toString('base64');
  const dataURI = `data:${imageType};base64,${base64}`;

  return dataURI;
};

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
  const name = req.body['image_name'];
  console.log('/guided', JSON.stringify(req.body));

  getBase64(`https://picsum.photos/${name}`).then(str => {
    return res.status(200).json({ base64: str });
  });
});

app.post('/frames', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  console.log(req.files);

  setTimeout(() => {
    res.json({
      session_id: 1,
      image_names: [
        'seed/1/380/340',
        'seed/3/380/280',
        // 'seed/4/260/300',
        // 'seed/20/380/320',
        // 'seed/40/360/320',
        // 'seed/25/380/260',
        // 'seed/54/220/260',
        // 'seed/32/320/300',
        // 'seed/36/240/360',
        // 'seed/14/320/240',
        // 'seed/65/240/300',
      ],
    });
  }, 1000);
});

app.get('/frame', (req, res) => {
  const { image_name: name, session_id: sessionId } = req.query;
  console.log({ name, sessionId });

  getBase64(`https://picsum.photos/${name}?grayscale`).then(str => {
    return res.status(200).json({ base64: str });
  });
});

app.listen(9001, () => console.log('Server Started...'));
