/// <reference types="vite/client" />

interface OmiseCard {
  configure: (options: { publicKey: string }) => void;
  open: (options: {
    amount: number;
    currency: string;
    defaultPaymentMethod: string;
    onCreateTokenSuccess: (nonce: string) => void;
  }) => void;
}

interface Window {
  OmiseCard: OmiseCard;
}

interface ImportMetaEnv {
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  readonly VITE_OMISE_PUBLIC_KEY: string;
  // add more as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
