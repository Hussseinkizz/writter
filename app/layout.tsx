"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { storeConfig } from "../react-hands-v2";
import "./metadata";

// Todo: use sleek design font stack
// Todo: make metadata work
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define initial state and actions
  const store = {
    count: 0,
    userState: null,
    local_userState: null,
    drawerOpen: true,
    notificationsOpen: false,
  };

  const actions = {
    decrement: (state: any) => ({ count: state.count - 1 }),
    increment: (state: any) => ({ count: state.count + 1 }),
    updateUser: (state: any, { payload }: any) => ({
      userState: payload,
      local_userState: payload,
    }),
    unSetUser: () => ({
      userState: null,
      local_userState: null,
    }),
    openDrawer: () => ({
      drawerOpen: true,
    }),
    closeDrawer: () => ({
      drawerOpen: false,
    }),
    toggleDrawer: (state: any) => ({
      drawerOpen: !state.drawerOpen,
    }),
    toggleNotifications: (state: any) => ({
      notificationsOpen: !state.notificationsOpen,
    }),
    closeNotifications: () => ({
      notificationsOpen: false,
    }),
  };

  // Configure the store
  const StoreProvider = storeConfig(store, actions);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Client Data Layer */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
