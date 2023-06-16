import { create } from "zustand";

/**
  * @author Fabian Duran
  * @description Hook para gestionar el estado global del loader. 
*/
export const useLoader = create((set) => ({
  show: false,
  setLoader: () => set((state) => ({ show: !state.show }))
}));