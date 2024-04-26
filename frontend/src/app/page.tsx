import { redirect } from "next/navigation";

export default function Home() {
  const user = false;
  if (!user) {
    return redirect("/signin");
  }
  return redirect("/history");
}
