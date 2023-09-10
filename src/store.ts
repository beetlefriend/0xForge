import Vue from "vue";
import Vuex from "vuex";
// import { ref, watch } from "vue";

Vue.use(Vuex);

// Define the window data interface
interface WindowData {
  id: number;
  title: string;
  isMinimized: boolean;
  focused: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  startsclosed: boolean;
  xBeforeMinimize?: number;
  yBeforeMinimize?: number;
  zIndex?: number; // add zIndex property
  closed: boolean;
}

// Define the root state interface
export type RootState = {
  windows: WindowData[];
  nextWindowId: number;
};
const createInitialWindows = (): WindowData[] => [
  // {
  //   id: 1,
  //   title: "Information",
  //   isMinimized: false,
  //   focused: false,
  //   x: 0.5 * (window.innerWidth - 400),
  //   y: 0.5 * (window.innerHeight - 300),
  //   width: 400,
  //   height: 300,
  //   startsclosed: false,
  //   closed: false,
  //   zIndex: 1,
  // },
  {
    id: 2,
    title: "Theme",
    isMinimized: true,
    focused: false,
    x: 0.5 * window.innerWidth,
    y: 0.05 * window.innerHeight,
    width: 400,
    height: 300,
    startsclosed: true,
    closed: true,
    zIndex: 1,
  },
  {
    id: 3,
    title: "Yep.txt",
    isMinimized: true,
    focused: false,
    x: 0.05 * window.innerWidth,
    y: 0.3 * window.innerHeight,
    width: 400,
    height: 300,
    startsclosed: true,
    closed: true,
    zIndex: 1,
  },


  {
    id: 4,
    title: "Token Creator",
    isMinimized: true,
    focused: false,
    width: 700,
    height: 400,
    x: 0.5 * (window.innerWidth - 700),
    y: 0.5 * (window.innerHeight - 400),
    startsclosed: true,
    closed: true,
    zIndex: 1,
  },
  // {
  //   id: 5,
  //   title: "Tokenomics.txt",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.6 * window.innerWidth,
  //   y: 0.2 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 6,
  //   title: "Uniswap.exe",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.3 * window.innerWidth,
  //   y: 0.3 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 7,
  //   title: "Super Mario",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.3 * window.innerWidth,
  //   y: 0.1 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 8,
  //   title: "Tetris",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.3 * window.innerWidth,
  //   y: 0.1 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 9,
  //   title: "Snake",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.3 * window.innerWidth,
  //   y: 0.1 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 10,
  //   title: "Info",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.7 * window.innerWidth,
  //   y: 0.05 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 11,
  //   title: "Recycle Bin",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.7 * window.innerWidth,
  //   y: 0.1 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 11,
  //   title: "Info",
  //   isMinimized: false,
  //   focused: false,
  //   x: 0.45 * window.innerWidth,
  //   y: 0.6 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: false,
  //   zIndex: 1,
  // },
  // {
  //   id: 14,
  //   title: "YEET_DAO_S01_E01",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.1 * window.innerWidth,
  //   y: 0.05 * window.innerHeight,
  //   width: 0,
  //   height: 0,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },

  // {
  //   id: 15,
  //   title: "Staking.exe",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.1 * window.innerWidth,
  //   y: 0.05 * window.innerHeight,
  //   width: 0,
  //   height: 0,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 16,
  //   title: "Auction.exe",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.5 * window.innerWidth,
  //   y: 0.05 * window.innerHeight,
  //   width: 0,
  //   height: 0,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 1337,
  //   title: "Yeetgame.exe",
  //   isMinimized: false,
  //   focused: false,
  //   x: 0.5 * window.innerWidth,
  //   y: 0.05 * window.innerHeight,
  //   width: 0,
  //   height: 0,
  //   startsclosed: true,
  //   closed: false,
  //   zIndex: 1,
  // },
  // {
  //   id: 12,
  //   title: "BitBear1100",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.4 * window.innerWidth,
  //   y: 0.15 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
  // {
  //   id: 13,
  //   title: "BitBear1100",
  //   isMinimized: true,
  //   focused: false,
  //   x: 0.4 * window.innerWidth,
  //   y: 0.2 * window.innerHeight,
  //   width: 400,
  //   height: 300,
  //   startsclosed: true,
  //   closed: true,
  //   zIndex: 1,
  // },
];

// Create the Vuex store
export const store = new Vuex.Store<RootState>({
  state: {
    windows: createInitialWindows(),
    nextWindowId: 6,
  },
  mutations: {
    createWindow(
      state: RootState,
      payload: {
        title: string;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
      }
    ) {
      const newWindow: WindowData = {
        id: state.nextWindowId++,
        title: payload.title,
        isMinimized: false,
        focused: false,
        x: payload.x ?? 0.4 * window.innerWidth,
        y: payload.y ?? 0.3 * window.innerHeight,
        width: payload.width ?? 400,
        height: payload.height ?? 300,
        closed: false,
        startsclosed: false,
      };
      state.windows.push(newWindow);
    },
    updateWindow(
      state: RootState,
      payload: { id: number; data: Partial<WindowData> }
    ) {
      const windowIndex = state.windows.findIndex((w) => w.id === payload.id);
      if (windowIndex > -1) {
        state.windows[windowIndex] = {
          ...state.windows[windowIndex],
          ...payload.data,
        };
      }
    },
    removeWindow(state: RootState, payload: { id: number }) {
      const window = state.windows.find((w) => w.id === payload.id);
      if (window) {
        window.isMinimized = true;
        window.closed = true;
      }
    },
    minimizeWindow(state: RootState, payload: { id: number }) {
      const windowIndex = state.windows.findIndex((w) => w.id === payload.id);
      if (windowIndex > -1) {
        state.windows[windowIndex].isMinimized =
          !state.windows[windowIndex].isMinimized;
        if (state.windows[windowIndex].isMinimized) {
          state.windows[windowIndex].xBeforeMinimize =
            state.windows[windowIndex].x;
          state.windows[windowIndex].yBeforeMinimize =
            state.windows[windowIndex].y;
        }
      }
    },
    toggleMinimizeWindow(state, { id }) {
      const windowIndex = state.windows.findIndex((w) => w.id === id);
      if (windowIndex !== -1) {
        const window = state.windows[windowIndex];
        const updatedWindow = { ...window, isMinimized: !window.isMinimized };
        Vue.set(state.windows, windowIndex, updatedWindow);

        // If the window is being unminimized, trigger the focusWindow mutation
        if (!updatedWindow.isMinimized) {
          for (let i = 0; i < state.windows.length; i++) {
            if (i !== windowIndex) {
              state.windows[i].focused = false;
            }
          }
          updatedWindow.focused = true;
          updatedWindow.zIndex =
            Math.max(...state.windows.map((w) => w.zIndex)) + 1;
        }
      }
    },
    restoreWindow(state: RootState, payload: { id: number }) {
      const windowIndex = state.windows.findIndex((w) => w.id === payload.id);
      if (windowIndex > -1) {
        state.windows[windowIndex].isMinimized = false;
      }
    },
    focusWindow(state, windowId) {
      // Find the maximum zIndex among all windows
      // console.log("Window ID of focused:", windowId);

      const maxZIndex = state.windows.reduce(
        (max, w) => Math.max(max, w.zIndex),
        0
      );

      // Update the clicked window's zIndex and focused status
      state.windows = state.windows.map((w) => {
        if (w.id === windowId) {
          return { ...w, zIndex: maxZIndex + 1, focused: true };
        } else {
          return { ...w, focused: false };
        }
      });
    },
  },
  getters: {
    isWindowMinimized: (state) => (id: number) => {
      // console.log("Sigma sigma");
      const window = state.windows.find((w) => w.id === id);
      return window ? window.isMinimized : true;
    },
  },
  actions: {
    openWindow({ commit, state }, { id }: { id: number }) {
      const windowIndex = state.windows.findIndex((w) => w.id === id);
      if (windowIndex > -1) {
        const windowObj = state.windows[windowIndex];
        windowObj.closed = false;
        windowObj.isMinimized = false;
        windowObj.focused = true;
        windowObj.zIndex = Math.max(...state.windows.map((w) => w.zIndex)) + 1;
        commit("updateWindow", windowObj);
      }
    },

    createWindow({ commit, state }, windowData) {
      const existingWindow = state.windows.find(
        (window) => window.id === windowData.id
      );

      if (existingWindow) {
        commit("toggleMinimizeWindow", {
          id: existingWindow.id,
          minimize: false,
        });
        commit("focusWindow", existingWindow.id);
        return existingWindow;
      }

      const lastWindow = state.windows[state.windows.length - 1];
      const x = lastWindow.x + 20;
      const y = lastWindow.y + 20;

      const window = {
        id: windowData.id || state.nextWindowId++,
        title: windowData.title || "Untitled Window",
        width: windowData.width || 400,
        height: windowData.height || 300,
        x,
        y,
        isMinimized: false,
        focused: true,
      };
      commit("createWindow", window);
      return window;
    },
    updateWindowPosition({ commit }, { id, data }) {
      commit("updateWindow", { id, data });
    },
    updateWindow(
      { commit },
      payload: { id: number; data: Partial<WindowData> }
    ) {
      commit("updateWindow", payload);
    },

    removeWindow({ commit }, window: { id: number }) {
      commit("removeWindow", window);
    },
    minimizeWindow({ commit, state }, { id }: { id: number }) {
      const windowIndex = state.windows.findIndex((w) => w.id === id);
      if (windowIndex > -1) {
        const windowObj = state.windows[windowIndex];
        if (windowObj.isMinimized) {
          windowObj.x = windowObj.xBeforeMinimize || 0;
          windowObj.y = windowObj.yBeforeMinimize || 0;
        }
        commit("minimizeWindow", { id });
      }
    },
    // toggleMinimizeWindow(context, { id }) {
    //   const window = context.state.windows.find((w) => w.id === id);

    //   if (window) {
    //     const updatedWindow = { ...window, isMinimized: !window.isMinimized };
    //     context.commit("updateWindow", updatedWindow);

    //     // If the window is being unminimized, trigger the focusWindow action
    //     if (!updatedWindow.isMinimized) {
    //       context.dispatch("focusWindow", id);
    //     }
    //   }
    // },
    toggleMinimizeWindow({ commit }, { id }: { id: number }) {
      commit("toggleMinimizeWindow", { id });
    },
    toggleFocusWindow({ commit, state }, { id }: { id: number }) {
      const windowObj = state.windows.find((w) => w.id === id);
      if (windowObj) {
        const topZIndex = state.windows.reduce(
          (max, w) => Math.max(max, w.zIndex || 0),
          0
        );
        const windowData = {
          ...windowObj,
          focused: true,
          zIndex: topZIndex + 1,
        };
        commit("updateWindow", windowData);
      }
    },
    restoreWindow({ commit, state }, { id }: { id: number }) {
      const window = state.windows.find((w) => w.id === id);
      if (window) {
        window.isMinimized = false;
        commit("updateWindow", window);
      }
    },
    focusWindow({ commit }, windowId) {
      commit("focusWindow", windowId);
    },
  },
});
