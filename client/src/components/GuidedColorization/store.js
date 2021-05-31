import { createState, none } from "@hookstate/core";
import shortId from "shortid";
import axios from "axios";

import config from "envConfig";

const getDefaultState = () => ({
  photo: {
    wasSplit: false,
  },
  frameById: {},
  frameIds: [],
  points: [],
  highlightPointId: null,
  selectedColor: "",
  sessionId: null,
  selectedFrameId: null,
});

const guidedColorization = createState(getDefaultState());

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
  guidedColorization.photo.merge({
    url: originUrl,
    filename,
  });
};

const removePhoto = () => {
  guidedColorization.set(getDefaultState());
};

const setColorizedObjectUrlById = (id, url) => {
  guidedColorization.frameById[id].merge({ colorizedObjectUrl: url });
};

const updateFrameById = (id, frameToMerge) => {
  guidedColorization.frameById[id].merge(frameToMerge);
};

const selectFrameById = (id) => {
  guidedColorization.batch((state) => {
    state.selectedFrameId.set(id);
    state.points.set([]);
    state.highlightPointId.set(null);
  });
};

const getFrameById = async (id) => {
  const sessionId = guidedColorization.sessionId.get();
  const frame = guidedColorization.frameById[id].get();

  return axios
    .get(`${config.apiUrl}/frame?image_name=${frame.name}&session_id=${sessionId}`)
    .then(async (res) => {
      const file = res.data.base64;

      const blob = await fetch(file).then((r) => r.blob());

      const objectUrl = window.URL.createObjectURL(blob);

      updateFrameById(id, { objectUrl });
    })
    .catch((e) => {
      console.log(e);
    });
};

const getFrames = async () => {
  const photo = guidedColorization.photo.get();

  if (photo.wasSplit) {
    return;
  }

  console.log("photo.url", photo.url);

  const blob = await fetch(photo.url).then((r) => r.blob());
  const formData = new FormData();
  formData.append("file", blob, photo.filename);

  return axios
    .post(`${config.apiUrl}/frames`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(async (res) => {
      const { session_id: sessionId, image_names: frameNames } = res.data;

      guidedColorization.batch((state) => {
        state.sessionId.set(sessionId);

        frameNames.forEach((name, index) => {
          const id = shortId.generate();
          state.frameById[id].set({
            name,
          });

          state.frameIds[index].set(id);
        });
      });
    })
    .then(() => {
      return Promise.all(guidedColorization.frameIds.get().map((id) => getFrameById(id))).then((values) => {
        console.log(values);

        guidedColorization.photo.wasSplit.set(true);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

const colorizeFrame = async (id) => {
  const frame = guidedColorization.frameById[id].get();
  const sessionId = guidedColorization.sessionId.get();

  const points = guidedColorization.points.get();

  return axios
    .post(`${config.apiUrl}/guided`, {
      points: points.map((point) => ({
        pixel: [point.coords.y, point.coords.x],
        color: point.color,
      })),
      session_id: sessionId,
      image_name: frame.name,
    })
    .then(async (res) => {
      const base64 = res.data?.base64;

      const blob = await fetch(base64).then((r) => r.blob());

      const colorizedObjectUrl = window.URL.createObjectURL(blob);

      setColorizedObjectUrlById(id, colorizedObjectUrl);
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
  colorizeFrame,
  highlightPointById,
  unhighlightPoint,
  getFrames,
  getFrameById,
  selectFrameById,
};
