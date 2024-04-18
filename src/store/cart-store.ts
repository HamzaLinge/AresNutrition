import { Supplement } from "@prisma/client";
import { createStore } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartSupplement = Supplement & { quantity: number };

type SupplementStoreAttributes = {
  supplements: CartSupplement[];
};

type SupplementStoreActions = {
  addSupplement: (supplement: Supplement) => void;
  removeSupplement: (supplementId: string) => void;
  increaseQuantity: (supplementId: string) => void;
  decreaseQuantity: (supplementId: string) => void;
  clearCart: () => void;
};

export type SupplementStore = SupplementStoreAttributes &
  SupplementStoreActions;

const defaultInitCartState: SupplementStoreAttributes = {
  supplements: [],
};

export const createCartStore = (
  initState: SupplementStoreAttributes = defaultInitCartState
) => {
  return createStore<SupplementStore>()(
    persist(
      (set) => ({
        ...initState,
        addSupplement: (supplement: Supplement) =>
          set((state) => {
            const indexSupplement = state.supplements.findIndex(
              (food) => food.id === supplement.id
            );
            if (indexSupplement !== -1) {
              return { supplements: state.supplements };
            }
            return {
              supplements: [
                ...state.supplements,
                { ...supplement, quantity: 1 },
              ],
            };
          }),

        removeSupplement: (supplementId: string) =>
          set((state) => ({
            supplements: state.supplements.filter(
              (supplement) => supplement.id !== supplementId
            ),
          })),

        increaseQuantity: (supplementId: string) =>
          set((state) => ({
            supplements: state.supplements.map((supplement) =>
              supplement.id !== supplementId
                ? supplement
                : { ...supplement, quantity: supplement.quantity + 1 }
            ),
          })),

        decreaseQuantity: (supplementId: string) =>
          set((state) => ({
            supplements: state.supplements
              .filter(
                (supplement) =>
                  !(supplement.id === supplementId && supplement.quantity === 1)
              )
              .map((supplement) => {
                if (supplement.id === supplementId && supplement.quantity > 1) {
                  return { ...supplement, quantity: supplement.quantity - 1 };
                }
                return supplement;
              }),
          })),

        clearCart: () => set({ supplements: [] }),
      }),
      {
        name: "shopping-cart-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};
