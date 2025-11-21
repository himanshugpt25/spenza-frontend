type Listener = () => void;

let unauthorizedListener: Listener | null = null;

export const authEvents = {
  setUnauthorizedListener(listener: Listener | null) {
    unauthorizedListener = listener;
  },
  emitUnauthorized() {
    unauthorizedListener?.();
  },
};
