import BaseBarLoader from "react-spinners/BarLoader";
import { LoaderHeightWidthProps } from "react-spinners/helpers/props";

interface BarLoaderProps extends LoaderHeightWidthProps {}

export const BarLoader = (props: BarLoaderProps) => {
  return <BaseBarLoader color="#881337" className="bg-rose-900" {...props} />;
};
