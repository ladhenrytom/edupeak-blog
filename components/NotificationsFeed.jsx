"use client";

import {KnockFeedProvider, NotificationFeedPopover, NotificationIconButton} from "@knocklabs/react-notification-feed";

import {useState, useRef} from "react";
import "@knocklabs/react-notification-feed/dist/index.css";
import {useSession} from "next-auth/react";
import NotificationToaster from "@/components/NotificationToaster";

const NotificationFeed = () => {
  const {data: session} = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <KnockFeedProvider apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY} feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID} userId={session?.user.id}>
      <NotificationIconButton ref={notifButtonRef} onClick={e => setIsVisible(!isVisible)} />
      <NotificationFeedPopover buttonRef={notifButtonRef} isVisible={isVisible} onClose={() => setIsVisible(false)} />
      <NotificationToaster />
    </KnockFeedProvider>
  );
};

export default NotificationFeed;
