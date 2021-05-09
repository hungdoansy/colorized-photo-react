import { createState, none } from "@hookstate/core";
import shortId from "shortid";
import axios from "axios";

import config from "envConfig";

const guidedColorization = createState({
  photo: {},
  points: [],
  highlightPointId: null,
  selectedColor: "",
});

const highlightPointById = (id) => {
  guidedColorization.merge({
    highlightPointId: id,
  });
};

const unhighlightPoint = () => {
  guidedColorization.merge({
    highlightPointId: null,
  });
};

const appendPoint = (y, x) => {
  const id = shortId.generate();
  const color = guidedColorization.selectedColor.get();

  guidedColorization.points.merge([
    {
      id,
      coords: { y, x },
      color,
    },
  ]);
};

const removePointById = (id) => {
  const index = guidedColorization.points.get().findIndex((point) => point.id === id);

  if (index < 0) {
    return;
  }

  guidedColorization.points[index].set(none);
};

const removeAllPoints = () => {
  guidedColorization.points.set([]);
};

const selectColor = (color) => {
  guidedColorization.selectedColor.set(color);
};

const setPhoto = (originUrl, filename) => {
  guidedColorization.photo.set({
    url: originUrl,
    filename,
  });
};

const removePhoto = () => {
  guidedColorization.merge({
    photo: {},
    points: [],
  });
};

const setColorizedPhotoUrl = (url) => {
  guidedColorization.photo.merge({ colorizedUrl: url });
};

const uploadPhoto = async () => {
  const photo = guidedColorization.photo.get();
  const points = guidedColorization.points.get();

  const blob = await fetch(photo.url).then((r) => r.blob());
  const formData = new FormData();
  formData.append("file", blob, photo.filename);

  formData.append(
    "points",
    JSON.stringify(
      points.map((point) => ({
        pixel: [point.coords.y, point.coords.x],
        color: point.color,
      }))
    )
  );

  return axios
    .post(`${config.apiUrl}/guided`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(async (res) => {
      const colorizedPhotoString = res.data?.colorizedPhoto;

      const colorizedPhoto = await fetch(colorizedPhotoString).then((r) => r.blob());

      const colorizedPhotoUrl = window.URL.createObjectURL(colorizedPhoto);

      setColorizedPhotoUrl(colorizedPhotoUrl);
    })
    .catch((e) => {
      console.log(e);
    });
};

export default guidedColorization;

export {
  appendPoint,
  removePointById,
  selectColor,
  setPhoto,
  removePhoto,
  removeAllPoints,
  uploadPhoto,
  highlightPointById,
  unhighlightPoint,
};
