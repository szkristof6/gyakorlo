/* eslint no-shadow: ["error", { "allow": ["state"] }]  */

import firebase from '@/firebase';
import store from '@/store';
import db from '@/database';
import router from '@/router';

firebase.auth().onAuthStateChanged(async (profile) => {
  if (profile) {
    let user;
    /* eslint-disable */
    if (profile.user) {
      user = profile.user;
    } else {
      user = profile;
    }
    /* eslint-enable */
    let json = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
    };
    let szamjson = {
      szam: 1,
      user_id: profile.uid,
    };
    const query = await db.collection('users').doc(profile.uid).get();
    if (!query.exists) {
      json = {
        ...json,
        pont: 0,
      };
      const szamquery = await db.collection('szamok').doc('users').get();
      if (szamquery.exists) {
        const { szam } = szamquery.data();
        szamjson = {
          szam: szam + 1,
          user_id: profile.uid,
        };
      }
      db.collection('users').doc(json.id).set(json);
      db.collection('szamok').doc('users').set(szamjson);
    }
    store.commit('auth/setUser', json);
    router.push('/home');
  } else {
    store.commit('auth/setUser', null);
  }
});
