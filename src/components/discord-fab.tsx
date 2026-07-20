"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { useBooking } from "@/hooks/use-booking";

export function DiscordFab() {
  const [showText, setShowText] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const { openBooking } = useBooking();

  // After 3s, show the helper text bubble
  React.useEffect(() => {
    const t = setTimeout(() => setShowText(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="discord-fab">
      {/* Helper text bubble */}
      <AnimatePresence>
        {showText && !dismissed && (
          <motion.div
            className="discord-fab-text"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="discord-fab-dismiss"
            >
              <X className="h-2.5 w-2.5" />
            </button>
            <p className="text-xs text-foreground leading-relaxed">
              Want more info or to book a project?
              <br />
              <a
                href="https://discord.gg/VhKgEetwr8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7984F5] font-semibold underline-offset-2 hover:underline"
              >
                Join our Discord server
              </a>{" "}
              for the fastest response.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book a Project button (appears above Discord after dismiss or always) */}
      <AnimatePresence>
        {(dismissed || showText) && (
          <motion.button
            onClick={() => openBooking({})}
            className="book-project-btn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            Book a Project
            <ArrowRight className="inline-block ml-1.5 h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Discord button itself */}
      <motion.a
        href="https://discord.gg/VhKgEetwr8"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Discord server"
        className="discord-fab-btn block"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 12 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <DiscordLogo className="h-8 w-8 text-white" />
      </motion.a>
    </div>
  );
}

/* Official-style Discord logo (SVG) */
export function DiscordLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M20.317 4.369C18.777 3.699 17.135 3.213 15.429 2.948C15.213 3.341 14.961 3.87 14.789 4.285C12.988 4.04 11.211 4.04 9.443 4.285C9.271 3.87 9.013 3.341 8.797 2.948C7.09 3.213 5.447 3.7 3.908 4.371C0.926 8.812 0.139 13.139 0.532 17.41C2.584 18.918 4.572 19.831 6.525 20.428C7.022 19.752 7.464 19.034 7.843 18.276C7.117 18.006 6.423 17.675 5.771 17.291C5.941 17.166 6.108 17.036 6.271 16.902C9.954 18.608 13.952 18.608 17.591 16.902C17.755 17.036 17.923 17.166 18.092 17.291C17.439 17.676 16.744 18.007 16.018 18.277C16.397 19.034 16.839 19.753 17.336 20.429C19.29 19.832 21.279 18.919 23.331 17.41C23.797 12.492 22.532 8.205 20.317 4.369ZM8.318 14.731C7.213 14.731 6.305 13.715 6.305 12.462C6.305 11.209 7.194 10.192 8.318 10.192C9.442 10.192 10.35 11.209 10.331 12.462C10.331 13.715 9.442 14.731 8.318 14.731ZM15.914 14.731C14.809 14.731 13.901 13.715 13.901 12.462C13.901 11.209 14.79 10.192 15.914 10.192C17.038 10.192 17.946 11.209 17.927 12.462C17.927 13.715 17.038 14.731 15.914 14.731Z" />
    </svg>
  );
}
