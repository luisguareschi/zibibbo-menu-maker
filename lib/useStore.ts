import { create } from "zustand";
import { Menu, generateId } from "@/types/menu";

interface StoreValues {
  menu: Menu;
}

interface StoreActions {
  setMenu: (menu: Menu) => void;
  resetStore: () => void;
}

const initialStoreValues: StoreValues = {
  menu: {
    menuGroups: [
      {
        id: generateId(),
        label: "Appetizers",
        menuItems: [
          {
            id: generateId(),
            label: "Breadsticks",
            price: "$3.99",
          },
        ],
      },
    ],
  },
};

export const useStore = create<StoreValues & StoreActions>((set) => ({
  ...initialStoreValues,
  setMenu: (menu: Menu) => set({ menu }),
  resetStore: () => set(initialStoreValues),
}));
