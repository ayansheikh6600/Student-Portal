import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP_vQFn-GDOoLadmJUgTOBgmB0nEHKaKU",
  authDomain: "test-9a84e.firebaseapp.com",
  projectId: "test-9a84e",
  storageBucket: "test-9a84e.appspot.com",
  messagingSenderId: "681262139120",
  appId: "1:681262139120:web:dc16cbb0240f6cf5a26435",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fileUploader = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
  
      const metadata = {
        contentType: "image/jpeg",
      };
  
      const storageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error uploading file:", error);
          reject(error); // Reject the Promise if an error occurs
        },
        () => {
          // Upload completed successfully, now get the download URL
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL); // Resolve the Promise with the download URL
            })
            .catch((error) => {
              console.error("Error getting download URL:", error);
              reject(error); // Reject the Promise if an error occurs
            });
        }
      );
    });
  };
  

export { fileUploader };
