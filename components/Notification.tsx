interface NotificationProps {
  message: string;
}

export default function Notification({
  message,
}: NotificationProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 bg-white border border-green-200 shadow-xl rounded-2xl px-6 py-4 z-50">
      {message}
    </div>
  );
}