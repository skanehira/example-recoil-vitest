import { act, renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { describe, expect, it } from 'vitest';
import { modalState, useModal } from './useModal';

describe('test useModel', () => {
  it('should show model', async () => {
    const { result: {
      current: state,
    } } = renderHook(() => useRecoilValue(modalState), {
      wrapper: RecoilRoot,
    });

    expect(state.visible).toBe(false);

    const content = '<-- content -->';
    const title = '<-- title -->';

    const {
      result: modal,
    } = renderHook(() => useModal(), {
      wrapper: RecoilRoot,
    });

    act(() => {
      modal.current.showModal({
        content,
        title,
      });
    })

    expect(state.title).toBe(title);
    expect(state.content).toBe(content);
    expect(state.visible).toBe(true);
  });
});
