import { create } from "zustand";


const useAddMapModal = create((set) => ({

  isOpen: false,

  onOpen: () => set({ isOpen: true }),

  onClose: () => set({ isOpen: false }),

}));


export default useAddMapModal;