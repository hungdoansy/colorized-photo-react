import { createState } from "@hookstate/core";
import produce from "immer";

const photoUrls = createState([]);

const appendPhotoUrl = (url) => {
  photoUrls.set((state) =>
    produce(state, (draft) => {
      draft.push(url);
    })
  );
};

export default photoUrls;

export const action = {
  appendPhotoUrl,
};
