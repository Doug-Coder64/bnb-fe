import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    properties: await db.property.findMany(),
  });
};

export default function explore() {
  const data = useLoaderData<typeof loader>();
  return JSON.stringify(data);
}
