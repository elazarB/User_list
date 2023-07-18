import { create } from "zustand";


const useAddClientModal = create((set) => ({

  isOpen: false,

  onOpen: () => set({ isOpen: true }),

  onClose: () => set({ isOpen: false }),

}));


export default useAddClientModal;