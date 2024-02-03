import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function action({ params }: any) {
  throw new Error('oh dang!')
  await deleteContact(params.contactId);
  return redirect("/");
}
