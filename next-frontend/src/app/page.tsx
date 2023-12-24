import Heading from "./components/Heading";
import Location from "./components/Location";

export default function Page() {
  return (
    <div className="bg-zinc-500 dark:bg-white flex flex-col items-center justify-center p-3 gap-3">
      <Heading />
      <Location />
    </div>
  );
}
