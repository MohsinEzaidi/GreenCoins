import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      // User & Progress
      user: null,
      balance: 0,
      totalEarned: 0,
      rank: "Bronze",
      badges: [],
      streak: 5, // mock streak

      // Data
      transactions: [],
      notifications: [
        {
          id: 1,
          title: "Welcome!",
          message: "Thanks for joining GreenCoin.",
          date: new Date().toISOString(),
          read: false,
        },
      ],

      // Preferences
      preferences: {
        darkTheme: false,
        notificationsEnabled: true,
        locationSharing: true,
      },

      // Auth actions
      login: (userData) => set({ user: userData }),
      logout: () =>
        set({
          user: null,
          balance: 0,
          totalEarned: 0,
          transactions: [],
          badges: [],
        }),

      // Activity actions
      addTransaction: (tx) => {
        const coins = tx.amount || 0;
        const type = tx.type || "EARN";

        const newTransaction = {
          id: tx.id || Date.now(),
          type: type,
          amount: coins,
          date: tx.date || new Date().toISOString(),
          quantity: tx.quantity || 1,
        };

        const isEarn = coins > 0;
        const currentTotal = isEarn
          ? get().totalEarned + coins
          : get().totalEarned;
        let newRank = "Bronze";
        if (currentTotal > 1000) newRank = "Gold";
        else if (currentTotal > 500) newRank = "Silver";

        set((state) => ({
          balance: state.balance + coins,
          totalEarned: currentTotal,
          rank: newRank,
          transactions: [newTransaction, ...state.transactions],
        }));

        // Notification logic for badges (mocked)
        if (currentTotal > 500 && !get().badges.includes("Silver Tier")) {
          get().addBadge("Silver Tier");
        }
      },

      redeemReward: (reward) => {
        const state = get();
        if (state.balance < reward.coins) return false;

        const newTransaction = {
          id: Date.now(),
          type: "REDEEM",
          rewardName: reward.name,
          amount: -reward.coins,
          date: new Date().toISOString(),
        };

        set((state) => ({
          balance: state.balance - reward.coins,
          transactions: [newTransaction, ...state.transactions],
        }));
        return true;
      },

      // Social & Badges
      addBadge: (badgeName) => {
        set((state) => ({
          badges: [...state.badges, badgeName],
          notifications: [
            {
              id: Date.now(),
              title: "Achievement Unlocked!",
              message: `You've earned the ${badgeName} badge!`,
              date: new Date().toISOString(),
              read: false,
            },
            ...state.notifications,
          ],
        }));
      },

      // Settings
      toggleTheme: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            darkTheme: !state.preferences.darkTheme,
          },
        })),

      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
    }),
    {
      name: "greencoin-storage",
    },
  ),
);
