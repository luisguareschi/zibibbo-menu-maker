import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/useStore";
import { Plus } from "lucide-react";
import { MenuGroup } from "./menuGroup";
import { generateId, Menu } from "@/types/menu";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarLoader } from "../bar-loader";

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
    <div className="flex flex-col gap-10 h-full max-h-full overflow-y-auto hide-scrollbar">
      <h1 className="text-2xl text-gray-600">Create Menu</h1>
      {menu.menuGroups.map((menuGroup) => (
        <MenuGroup key={menuGroup.id} menuGroup={menuGroup} />
      ))}
      <Button variant="default" onClick={handleAddGroup}>
        <Plus />
        Add Group
      </Button>
    </div>
  );
};
