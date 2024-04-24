"use server";

import db from "@/db/db";

export async function deleteOrderById(orderId: string) {
  await db.orderSupplement.deleteMany({
    where: { orderId },
  });
  await db.order.delete({ where: { id: orderId } });
}
