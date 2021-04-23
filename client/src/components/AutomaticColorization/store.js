import { createState } from "@hookstate/core";

const automaticColorization = createState({
  photoUrls: [],
});

const appendPhotoUrl = (url, filename) => {
  automaticColorization.photoUrls.merge([{ url, filename }]);
};

export default automaticColorization;

export { appendPhotoUrl };
