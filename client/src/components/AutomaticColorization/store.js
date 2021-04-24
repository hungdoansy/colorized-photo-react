import { createState } from "@hookstate/core";
import shortId from "shortid";

const automaticColorization = createState({
  photoById: {},
  ids: [],
});

const getPhotoById = (photoId) => {
  return automaticColorization.photos[photoId]?.get();
};

const appendPhotoUrl = (originUrl, filename) => {
  const id = shortId.generate();

  automaticColorization.merge((state) => {
    const { photoById, ids } = state;
    photoById[id] = {
      id,
      originUrl,
      filename,
      colorizedUrl: undefined,
    };

    ids.push(id);

    return {
      photoById,
      ids,
    };
  });
};

const updateColorizedUrlById = (photoId, url) => {
  const foundPhotoId = automaticColorization.ids.get().includes(photoId);

  if (foundPhotoId) {
    automaticColorization.photoById[photoId].merge({
      colorizedUrl: url,
    });
  } else {
    console.error(`Cannot find photo of id: ${photoId}`);
  }
};

export default automaticColorization;

export { appendPhotoUrl, updateColorizedUrlById, getPhotoById };
