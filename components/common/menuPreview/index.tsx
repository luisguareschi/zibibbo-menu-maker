/* eslint-disable @next/next/no-img-element */
import logoImg from "@/assets/logo.png";
import { useStore } from "@/lib/useStore";
import { MenuGroupPreview } from "./menuGroupPreview";
import { Button } from "@/components/ui/button";
import { Minus, PlusIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const A4_WIDTH = 1414;
const A4_HEIGHT = 2000;

interface MenuPreviewProps {
  onPreviewChange: (previewElement: HTMLDivElement) => void;
}

export const MenuPreview = ({ onPreviewChange }: MenuPreviewProps) => {
  const { menu } = useStore();
  const [zoom, setZoom] = useState(0.5);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleZoom = (value: number) => {
    if (zoom === 0.1 || zoom === 1) return;
    setZoom(zoom + value);
  };

  useEffect(() => {
    onPreviewChange(previewRef.current as HTMLDivElement);
  }, [menu]);

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-auto justify-start items-start pb-10">
      <div className="sticky top-0 bg-white flex flex-col justify-start items-start gap-2 w-full z-20 border-b border-gray-100 pb-4">
        <h1 className="text-2xl text-gray-600 text-left w-full">
          Preview ({Math.round(zoom * 100)}%)
        </h1>
        <div className="flex flex-row gap-2 items-center">
          <Button variant="outline" size="icon" onClick={() => handleZoom(0.1)}>
            <PlusIcon className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleZoom(-0.1)}
          >
            <Minus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div
        ref={previewRef}
        className="origin-top-left mx-auto"
        style={{ height: A4_HEIGHT * zoom, width: A4_WIDTH * zoom }}
      >
        <div
          className="w-[1414px] h-[2000px] min-w-[1414px] min-h-[2000px] bg-white border-2 
          px-[140px] py-[100px] gap-[50px]
           flex flex-col border-gray-100 rounded-lg shadow-md"
          style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
        >
          <img
            src={logoImg.src}
            alt="logo"
            className="w-[470px] h-[120px] mx-auto"
          />
          {menu.menuGroups.map((menuGroup) => (
            <MenuGroupPreview key={menuGroup.id} menuGroup={menuGroup} />
          ))}
          <footer className="text-[22px] text-gray-950 w-full text-center font-goudi italic">
            Prix ttc service compris. La maison n’accepte pas les chèques. La
            liste des allergènes est disponible sur demande.
          </footer>
        </div>
      </div>
    </div>
  );
};
