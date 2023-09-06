import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootState {
  windows: WindowData[];
}

interface WindowData {
  id: number;
  title: string;
  isMinimized: boolean;
  focused: boolean;
}

const store = new Vuex.Store<RootState>({
  state: {
    windows: [],
  },
  mutations: {
    createWindow(state: RootState, payload: { title: string }) {
      const newWindow = {
        id: Date.now(),
        title: payload.title,
        isMinimized: false,
        focused: false,
      };
      state.windows.push(newWindow);
    },
    updateWindow(
      state: RootState,
      payload: { id: number; [key: string]: any }
    ) {
      const windowIndex = state.windows.findIndex((w) => w.id === payload.id);
      if (windowIndex > -1) {
        state.windows[windowIndex] = {
          ...state.windows[windowIndex],
          ...payload,
        };
      }
    },
    removeWindow(state: RootState, payload: { id: number }) {
      state.windows = state.windows.filter((w) => w.id !== payload.id);
    },
    minimizeWindow(state: RootState, payload: { id: number }) {
      const windowIndex = state.windows.findIndex((w) => w.id === payload.id);
      if (windowIndex > -1) {
        state.windows[windowIndex].isMinimized =
          !state.windows[windowIndex].isMinimized;
      }
    },
    closeWindow(state: RootState, payload: { id: number }) {
      state.windows = state.windows.filter((w) => w.id !== payload.id);
    },
  },
});

export default store;
