/* eslint-disable */

import { firestoreAction } from 'vuexfire';
import db from '@/database';

const state = {
  users: [],
  LoadedUser: false,
};

const getters = {
  usersByID(state) {
    return state.users.reduce((byId, user) =>{ 
      byId[user.id] = user;
      return byId;
    }, {});
  },
};

const mutations = {
  LoadedUser (state) {
    state.LoadedUser = true;
  }
}

const actions = {
  init: firestoreAction(({ bindFirestoreRef, commit }) => {
    setTimeout(() => {
      bindFirestoreRef('users', db.collection('users').orderBy('pont', 'desc')).then(() => {
        commit("LoadedUser");
      })
    }, 0); // teszt
  }),
  async InitPaginate() {
    const { docs } = await db.collection('users')
      .orderBy('created_at')
      .limit(2)
      .get();
    return docs;
  },
  async NextPaginate(context, last) {
    console.log(last);
    const { docs } = await db.collection('users')
      .orderBy('created_at')
      .startAfter(last.data().created_at)
      .limit(2)
      .get();
    return docs;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
