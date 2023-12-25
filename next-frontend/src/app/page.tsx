import dynamic from "next/dynamic";
import Heading from "./components/Heading";
import Location from "./components/Location";
const NoSSR = dynamic(() => import("./components/Time"), { ssr: false });

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-3 gap-3">
      <Heading />
      <NoSSR />
      <Location />
    </div>
  );
}
