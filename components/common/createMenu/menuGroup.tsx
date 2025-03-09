import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/useStore";
import { MenuGroup as MenuGroupType, generateId } from "@/types/menu";
import { ChevronRight, Plus, Trash } from "lucide-react";

interface MenuGroupProps {
  menuGroup: MenuGroupType;
}

export const MenuGroup = ({ menuGroup }: MenuGroupProps) => {
  const { menu, setMenu } = useStore();

  const handleDeleteItem = (itemId: string) => {
    setMenu({
      ...menu,
      menuGroups: menu.menuGroups.map((group) => ({
        ...group,
        menuItems: group.menuItems.filter((item) => item.id !== itemId),
      })),
    });
  };

  const handleAddItem = (groupId: string) => {
    setMenu({
      ...menu,
      menuGroups: menu.menuGroups.map((group) =>
        group.id === groupId
          ? {
              ...group,
              menuItems: [
                ...group.menuItems,
                { id: generateId(), label: "", price: "" },
              ],
            }
          : group,
      ),
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    setMenu({
      ...menu,
      menuGroups: menu.menuGroups.filter((group) => group.id !== groupId),
    });
  };

  const handleChangeItem = (itemId: string, key: string, value: string) => {
    setMenu({
      ...menu,
      menuGroups: menu.menuGroups.map((group) =>
        group.id === menuGroup.id
          ? {
              ...group,
              menuItems: group.menuItems.map((item) =>
                item.id === itemId ? { ...item, [key]: value } : item,
              ),
            }
          : group,
      ),
    });
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Group Name"
          value={menuGroup.label}
          onChange={(e) => {
            setMenu({
              ...menu,
              menuGroups: menu.menuGroups.map((group) =>
                group.id === menuGroup.id
                  ? { ...group, label: e.target.value }
                  : group,
              ),
            });
          }}
        />
        <Button
          variant="outline"
          onClick={() => handleDeleteGroup(menuGroup.id)}
        >
          <Trash />
        </Button>
      </div>

      {menuGroup.menuItems.map((item) => (
        <div key={item.id} className="flex gap-2 items-center">
          <div className="text-gray-500 text-sm px-3">
            <ChevronRight />
          </div>
          <Input
            type="text"
            placeholder="Item Name"
            value={item.label}
            onChange={(e) => handleChangeItem(item.id, "label", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Item Price"
            value={item.price}
            onChange={(e) => handleChangeItem(item.id, "price", e.target.value)}
          />
          <Button variant="outline" onClick={() => handleDeleteItem(item.id)}>
            <Trash />
          </Button>
        </div>
      ))}
      <Button
        className="w-fit self-end"
        variant="outline"
        onClick={() => handleAddItem(menuGroup.id)}
      >
        <Plus />
        Add Item
      </Button>
    </div>
  );
};
