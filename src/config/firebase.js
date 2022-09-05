import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyBtRKZwBiPcsx_vmI-YwBzLVSgZvEvjxp4',
    authDomain: 'tiktok-c3144.firebaseapp.com',
    projectId: 'tiktok-c3144',
    storageBucket: 'tiktok-c3144.appspot.com',
    messagingSenderId: '479079831898',
    appId: '1:479079831898:web:42e839b5536f57daddbb63',
    measurementId: 'G-6JNSTEDPGS',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
