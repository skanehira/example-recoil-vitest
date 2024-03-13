import { ReactNode, useCallback } from "react";
import { atom, useSetRecoilState } from 'recoil';

type ModalState = {
  content: ReactNode;
  title: ReactNode;
  visible: boolean;
};

export const modalState = atom<ModalState>({
  key: 'modal',
  default: {
    content: null,
    title: '',
    visible: false,
  },
});

interface ShowModalOption {
  content: ReactNode;
  title: string;
}

export function useModal() {
  const setModal = useSetRecoilState(modalState);

  const showModal = useCallback(
    ({ content, title }: ShowModalOption) => {
      setModal((current) => ({
        ...current,
        visible: true,
        content,
        title,
      }));
    },
    [setModal],
  );

  const closeModal = useCallback(() => {
    setModal((current) => ({
      ...current,
      visible: false,
    }));
  }, [setModal]);

  return {
    showModal,
    closeModal,
  };
}
