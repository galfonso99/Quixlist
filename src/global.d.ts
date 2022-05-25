/// <reference types="@sveltejs/kit" />


interface ImportMetaEnv {
	VITE_API_KEY: string;
	VITE_AUTH_DOMAIN: string;
	VITE_FIREBASE_DATABASE: string;
	VITE_FIREBASE_PROJECT: string;
	VITE_FIREBASE_STORAGE: string;
	VITE_FIREBASE_MESSAGING: string;
	VITE_FIREBASE_APP: string;
  VITE_FIREBASE_MEASURE: string;
}

declare type DndEvent = import("svelte-dnd-action").DndEvent;
declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
        onconsider?: (event: CustomEvent<DndEvent> & {target: EventTarget & T}) => void;
        onfinalize?: (event: CustomEvent<DndEvent> & {target: EventTarget & T}) => void;
    }
}
