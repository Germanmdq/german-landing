import { DeliveryScreen } from '../../components/delivery-screen';
import '../../magic-ui.css';
import '../../modern-ui.css';
import '../delivery.css';

export default async function DeliveryEntry({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <DeliveryScreen deliveryId={id} />;
}
