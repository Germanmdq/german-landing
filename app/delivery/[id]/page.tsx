import { redirect } from 'next/navigation';

export default async function DeliveryEntry({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/?delivery=${encodeURIComponent(id)}`);
}
