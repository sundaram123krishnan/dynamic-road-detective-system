import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Loading() {
  return (
    <Alert className="border-blue-500 bg-blue-100">
      <Terminal className="h-4 w-4" />
      <AlertTitle className="font-bold">Alert!</AlertTitle>
      <AlertDescription>
        Please enable location on your device to use this application
      </AlertDescription>
    </Alert>
  );
}
