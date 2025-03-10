import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/useStore";
import { Plus } from "lucide-react";
import { MenuGroup } from "./menuGroup";
import { generateId } from "@/types/menu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const CreateMenuForm = () => {
  const router = useRouter();
  const { menu, setMenu } = useStore();

  useEffect(() => {
    const encodedMenu = encodeURIComponent(JSON.stringify(menu));
    router.push(`?menu=${encodedMenu}`);
  }, [menu]);

  const handleAddGroup = () => {
    setMenu({
      ...menu,
      menuGroups: [
        ...menu.menuGroups,
        { id: generateId(), label: "", menuItems: [] },
      ],
    });
  };

  return (
    <div className="flex flex-col gap-10 h-full max-h-full overflow-y-auto hide-scrollbar pl-1">
      <h1 className="text-2xl text-gray-600">Create Menu</h1>
      {menu.menuGroups.map((menuGroup) => (
        <MenuGroup key={menuGroup.id} menuGroup={menuGroup} />
      ))}
      <Button
        variant="default"
        onClick={handleAddGroup}
        className="sticky bottom-0 left-0"
      >
        <Plus />
        Add Group
      </Button>
    </div>
  );
};
