import { atom } from "jotai";

type InitialStateType = { open: boolean; identityParameterId: string | null };
const initialState: InitialStateType = {
  open: false,
  identityParameterId: null,
};

const identityParameterFormDrawerAtom = atom(initialState);

export default identityParameterFormDrawerAtom;
