"use client";

import { atom } from "jotai";

export const commentsAtom = atom<string[]>([]);
export const isPopupOpenAtom = atom(false);
export const postIdAtom = atom<string>('');