let nextCredential;
export const signInWithEmailAndPassword = () => {
  if (nextCredential) {
    return nextCredential;
  }
  nextCredential = null;
};

export const getAuth = () => {};

export const decorator = (story, { parameters }) => {
  if (parameters && parameters.firebaseAuth) {
    nextCredential = parameters.firebaseAuth.credential;
  }
  return story();
};
