"use client";
import { CreateMenuForm } from "@/components/common/createMenu";
import { MenuPreview } from "@/components/common/menuPreview";
import { Menu } from "@/types/menu";
import { useStore } from "@/lib/useStore";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FullScreenLoading from "@/components/common/full-screen-loading";
import { Button } from "@/components/ui/button";
import { Download, Import, Save } from "lucide-react";
import html2canvas from "html2canvas";
import { toast } from "react-hot-toast";

const decodeMenu = (string: string) => {
  try {
    return JSON.parse(decodeURIComponent(string));
  } catch (error) {
    return null;
  }
};

const MainPage = () => {
  const { menu, setMenu } = useStore();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);
  const existingMenu: Menu | null = decodeMenu(searchParams.get("menu") || "");
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(
    null,
  );

  const handleExport = () => {
    // export the previewRef as an image
    html2canvas(previewElement as HTMLDivElement).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "menu.png";
      link.click();
    });
    toast.success("Menu exported successfully");
  };

  const handleSave = () => {
    const menuString = JSON.stringify(menu);
    // save this string as a txt file
    const link = document.createElement("a");
    link.href =
      "data:text/plain;charset=utf-8," + encodeURIComponent(menuString);
    link.download = "menuBackup.txt";
    link.click();
    toast.success("Menu saved successfully");
  };

  const handleImport = () => {
    try {
      const file = document.createElement("input");
      file.type = "file";
      file.accept = ".txt";
      file.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const menuString = e.target?.result as string;
            setMenu(JSON.parse(menuString));
            toast.success("Menu imported successfully");
          };
          reader.readAsText(file);
        }
      };
      file.click();
    } catch (error) {
      console.error(error);
      toast.error("Error importing menu");
    }
  };

  useEffect(() => {
    if (existingMenu && !checked) {
      setMenu(existingMenu);
    }
    setChecked(true);
  }, [checked]);

  if (!checked) return <FullScreenLoading />;

  return (
    <div className="grid grid-cols-2 h-full w-full bg-gray-100 p-6 gap-6">
      <nav className="bg-white h-full w-full rounded-lg p-5 col-span-2 flex gap-4 justify-start items-center">
        <h1 className="text-2xl font-semibold text-gray-700 mr-auto">
          Menu Maker
        </h1>
        <Button
          size="lg"
          variant="outline"
          className="flex flex-row gap-2 items-center justify-center"
          onClick={handleImport}
        >
          <Import className="w-4 h-4" />
          Import
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="flex flex-row gap-2 items-center justify-center"
          onClick={handleSave}
        >
          <Save className="w-4 h-4" />
          Save
        </Button>
        <Button
          size="lg"
          className="flex flex-row gap-2 items-center justify-center"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" />
          Export
        </Button>
      </nav>
      <div className="bg-white h-full w-full rounded-lg p-5 overflow-y-auto">
        <CreateMenuForm />
      </div>
      <div className="bg-white h-full w-full rounded-lg p-5 overflow-y-auto">
        <MenuPreview onPreviewChange={setPreviewElement} />
      </div>
    </div>
  );
};

const Wrapper = () => {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  );
};

export default Wrapper;
