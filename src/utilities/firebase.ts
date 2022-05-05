import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  clientId:
    '948963145889-pj84uua1u6qsta15n1hc4h89tgerp530.apps.googleusercontent.com',
  appId: '1:948963145889:ios:edcd626d45b3fa103118e0',
  apiKey: 'AIzaSyDEu4pl1tLGmvcxD9Eh7_6GJiO6cLdJtiA',
  databaseURL: '',
  storageBucket: 'sustainability-app-6f466.appspot.com',
  messagingSenderId: '948963145889',
  projectId: 'sustainability-app-6f466',
};

// Initialize Firebase
let appInstance;

export const initApp = async () => {
  appInstance = await firebase.initializeApp(firebaseConfig);
};

export default appInstance;
