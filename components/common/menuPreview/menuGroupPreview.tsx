import { MenuGroup } from "@/types/menu";

interface MenuGroupPreviewProps {
  menuGroup: MenuGroup;
}

export const MenuGroupPreview = ({ menuGroup }: MenuGroupPreviewProps) => {
  return (
    <div className="text-brand flex flex-col gap-[50px]">
      <h1 className="text-[96px] font-semibold text-left w-full font-aramo">
        {menuGroup.label}
      </h1>
      <div className="flex flex-col gap-3 font-goudi text-gray-950">
        {menuGroup.menuItems.map((item) => (
          <div key={item.id} className="flex justify-between gap-[35px]">
            <h2 className="text-[25px] font-semibold">
              {item.label.toUpperCase()}
            </h2>
            <p className="text-[25px] font-semibold">
              {item.price.toLocaleUpperCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
