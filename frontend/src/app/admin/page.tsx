import { redirect } from "next/navigation";

export default function admin() {
  const user = false;
  return redirect("/admin/booking");
}
