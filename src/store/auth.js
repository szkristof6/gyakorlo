/* eslint no-shadow: ["error", { "allow": ["state"] }]  */

import firebase from '@/firebase';
import router from '@/router';
import { firestoreAction } from 'vuexfire';

const state = {
  user: {},
  isLoggedIn: false,
};

const mutations = {
  setUser(state, user) {
    if (user) {
      state.user = user;
      state.isLoggedIn = true;
    } else {
      state.user = {};
      state.isLoggedIn = false;
    }
  },
};

const actions = {
  async login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  },
  unbindUsers: firestoreAction(({ unbindFirestoreRef }) => {
    console.log('#');
    unbindFirestoreRef('users');
  }),
  async logout() {
    await firebase.auth().signOut();
    router.push('/');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
