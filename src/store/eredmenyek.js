/* eslint-disable */

import { firestoreAction } from 'vuexfire';
import db from '@/database';

const state = {
  eredmenyek: [],
  LoadedEredmenyek: false,
};

const mutations = {
  LoadedEredmenyek(state) {
    state.LoadedEredmenyek = true;
  }
}

const actions = {
  initEredmenyek: firestoreAction(({ bindFirestoreRef, commit }) => {
    setTimeout(() => {
      bindFirestoreRef('eredmenyek', db.collection('games').orderBy('created_at', 'desc')).then(() => {
        commit("LoadedEredmenyek");
      })
    }, 0); //teszt
  }),
  async InitPaginate() {
    const { docs } = await db.collection('games')
      .orderBy('created_at')
      .limit(2)
      .get();
    return docs;
  },
  async NextPaginate(context, last) {
    console.log(last);
    const { docs } = await db.collection('games')
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
