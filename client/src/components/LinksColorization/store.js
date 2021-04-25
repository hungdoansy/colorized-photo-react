import { createState } from "@hookstate/core";
import shortId from "shortid";

const getDefaultState = () => {
  return {
    url: null,
    photoById: {},
    ids: [],
  };
};

const linksColorization = createState(getDefaultState());

const getPhotoById = (photoId) => {
  return linksColorization.photoById[photoId]?.get();
};

const setUrl = (url) => {
  linksColorization.url.set(url);
};

const removeUrl = () => {
  linksColorization.set(getDefaultState());
};

const setOriginPhotos = (urls) => {
  linksColorization.batch((state) => {
    urls.forEach((url) => {
      const id = shortId.generate();

      state.photoById[id].set({
        id,
        originUrl: url,
        selected: false,
      });

      state.ids.merge([id]);
    });
  });
};

const updateColorizedUrlById = (photoId, url) => {
  const foundPhotoId = linksColorization.ids.get().includes(photoId);

  if (foundPhotoId) {
    linksColorization.photoById[photoId].merge({
      colorizedUrl: url,
    });
  } else {
    console.error(`Cannot find photo of id: ${photoId}`);
  }
};

const updateColorizedPhotos = (photos) => {
  linksColorization.batch((state) => {
    photos.forEach((photo) => {
      state.photoById[photo.id].merge({ colorizedUrl: photo.colorizedUrl });
    });
  });
};

const selectPhotoById = (photoId) => {
  console.log("here");
  linksColorization.photoById[photoId].merge({
    selected: true,
  });
};

const unselectPhotoById = (photoId) => {
  const wasColorized = !!linksColorization.photoById[photoId].colorizedUrl.get();

  if (!wasColorized) {
    linksColorization.photoById[photoId].merge({
      selected: false,
    });
  }
};

const getNumberOfSelectedPhotos = () => {
  return linksColorization.ids.get().reduce((sum, id) => {
    return sum + !!linksColorization.photoById[id].selected.get();
  }, 0);
};

const selectAllPhoto = () => {
  linksColorization.ids.get().forEach((id) => {
    linksColorization.photoById[id].merge({ selected: true });
  });
};

const unselectAllPhoto = () => {
  linksColorization.ids.get().forEach((id) => {
    linksColorization.photoById[id].merge({ selected: false });
  });
};

const getSelectedPhotos = () => {
  const ids = linksColorization.ids.get();

  const result = [];

  ids.forEach((id) => {
    const photo = linksColorization.photoById[id].get();

    if (photo.selected && !photo.colorizedUrl) {
      result.push({
        id: photo.id,
        originUrl: photo.originUrl,
      });
    }
  });

  return result;
};

const getColorizedPhotos = () => {
  const ids = linksColorization.ids.get();

  const result = [];

  ids.forEach((id) => {
    const photo = linksColorization.photoById[id].get();

    if (photo.colorizedUrl) {
      result.push(photo);
    }
  });

  return result;
};

export default linksColorization;

export {
  setOriginPhotos,
  updateColorizedUrlById,
  getPhotoById,
  selectPhotoById,
  getNumberOfSelectedPhotos,
  selectAllPhoto,
  unselectAllPhoto,
  getSelectedPhotos,
  updateColorizedPhotos,
  getColorizedPhotos,
  setUrl,
  removeUrl,
  unselectPhotoById,
};
