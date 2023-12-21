import { atom } from "jotai";

type InitialStateType = { open: boolean; parameterId?: string|null };
const initialState = { open: false, parameterId: null };

const parameterFormDrawerAtom = atom<InitialStateType>(initialState);

export default parameterFormDrawerAtom;
