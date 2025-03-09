export interface MenuItem {
  id: string;
  label: string;
  price: string;
}

export interface MenuGroup {
  id: string;
  label: string;
  menuItems: MenuItem[];
}

export interface Menu {
  menuGroups: MenuGroup[];
}

export const generateId = () => {
  return Math.random().toString(36).substring(2, 15);
};
