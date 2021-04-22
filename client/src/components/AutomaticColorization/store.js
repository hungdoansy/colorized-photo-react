import { createState } from "@hookstate/core";

const automaticColorization = createState({
  photoUrls: [],
});

const appendPhotoUrl = (url) => {
  automaticColorization.photoUrls.merge([url]);
};

export default automaticColorization;

export { appendPhotoUrl };
