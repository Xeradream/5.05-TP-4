import { OrderDetailsLayout } from "tp-kit/components";
import { NextPageProps } from "../../../../types";
import prisma from "../../../../utils/prisma";
import { notFound } from "next/navigation";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import RealTimeOrderDetails from "../../../../components/real-time-order-details";

type Props = {
  orderId: string;
}

export default async function OrderDetailsPage({params}: NextPageProps<Props>) {
  const orderId : number = parseInt(params.orderId);
  console.log(params.orderId)
  const order = await prisma.order.findUnique({
    where: {id: orderId},
    include: {
      lines: {
        include: { product: true }
      }
    }
  });

  if (!order) notFound();

  return <RealTimeOrderDetails order={order} />
}