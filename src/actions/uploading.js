import { myFirebase } from '../firebase/firebase';
import * as actionTypes from './types';

export const uploadProfileImg = file => dispatch => {
  const user = myFirebase.auth().currentUser;
  const uid = user.uid;
  const photoURL = `user-pictures/${uid}/${file.name}`;

  const storageRef = myFirebase.storage().ref(photoURL);

  const uploadTask = storageRef.put(file);
  dispatch({ type: actionTypes.UPLOADING_START });

  uploadTask.on(
    'state_changed',
    snapshot => {},
    error => {
      dispatch({ type: actionTypes.UPLOADING_FAIL, payload: error });
    },
    () => {
      dispatch({ type: actionTypes.UPLOADING_SUCCESS });
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        user
          .updateProfile({
            photoURL: url,
          })
          .then(() => {
            myFirebase
              .database()
              .ref(`users/${uid}/`)
              .update({
                photoURL: url,
              })
              .then(
                dispatch({
                  type: actionTypes.UPDATE_PROFILE_IMG_URL,
                  payload: url,
                })
              );
          });
      });
    }
  );
};

export const uploadGroupImg = (file, room) => dispatch => {
  const photoURL = `room-data/${room}/${file.name}`;

  const storageRef = myFirebase.storage().ref(photoURL);

  const uploadTask = storageRef.put(file);
  dispatch({ type: actionTypes.UPLOADING_START });

  uploadTask.on(
    'state_changed',
    snapshot => {},
    error => {
      dispatch({ type: actionTypes.UPLOADING_FAIL, payload: error });
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then(url => {
        myFirebase
          .database()
          .ref(`room-metadata/${room}/`)
          .update({ photoURL: url })
          .then(
            () => {
              dispatch({ type: actionTypes.UPLOADING_SUCCESS });
            },
            error => {
              dispatch({ type: actionTypes.UPLOADING_FAIL, payload: error });
            }
          );
      });
    }
  );
};

// export const uploadImage = data => async (dispatch, getState) => {
//   const firestore = myFirebase.storage();
//   try {
//     // Create the file metadata
//     const metadata = {
//       contentType: 'image/jpeg',
//     };

//     // Upload file and metadata to the object 'images/mountains.jpg'
//     const uploadTask = storageRef
//       .child('images/' + data.name)
//       .put(data, metadata);

//     dispatch({ type: UPLOADING_START });

//     uploadTask.on(
//       'state_changed',
//       snapshot => {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         dispatch({ type: UPLOADING, payload: Math.floor(progress) });
//       },
//       error => {
//         // Handle unsuccessful uploads
//         dispatch({ type: UPLOADING_FAIL, payload: error });
//       },
//       () => {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
//           dispatch({ type: UPLOADING_SUCCESS });
//           firestore
//             .collection('data')
//             .doc('user')
//             .update({
//               image_url: downloadURL,
//             })
//             .then(() => {
//               //get the latest data
//               //once the data is sent to the firestore the latest version is stored in the redux store
//               get_Data(dispatch, getState, { getFirestore });
//             })
//             .catch(e => {
//               console.log(e);
//             });
//         });
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };
