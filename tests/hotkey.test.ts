import { render, cleanup, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TestHotkey from './TestHotkey.svelte';
import { tick } from 'svelte';

describe('hotkey action (integration)', () => {
    beforeEach(() => {
        cleanup();
    });

    async function triggerKey(code: string, options: Partial<KeyboardEvent> = {}) {
        await fireEvent.keyDown(window, { code, ...options });
        await tick();
    }

    it('calls handler on matching combo', async () => {
        const handle = vi.fn();

        render(TestHotkey, { props: { code: 'KeyK', ctrlKey: true, handle } });

        await triggerKey('KeyK', { ctrlKey: true });

        expect(handle).toHaveBeenCalled();
    });

    it('does not call handler on non-matching combo', async () => {
        const handle = vi.fn();

        render(TestHotkey, { props: { code: 'KeyK', ctrlKey: true, handle } });

        await triggerKey('KeyK', { shiftKey: true });

        expect(handle).not.toHaveBeenCalled();
    });

    it('falls back to node.click() if no handle is passed', async () => {
        const { getByText } = render(TestHotkey, { props: { code: 'KeyX' } });

        const btn = getByText('Hotkey Button');
        const clickHandler = vi.fn();
        btn.addEventListener('click', clickHandler);

        await triggerKey('KeyX');

        expect(clickHandler).toHaveBeenCalled();
    });

    it('does not trigger if repeat and allowRepeat is false', async () => {
        const handle = vi.fn();

        render(TestHotkey, { props: { code: 'KeyR', allowRepeat: false, handle } });

        await triggerKey('KeyR', { repeat: true });

        expect(handle).not.toHaveBeenCalled();
    });

    it('does trigger if repeat and allowRepeat is true', async () => {
        const handle = vi.fn();

        render(TestHotkey, { props: { code: 'KeyR', allowRepeat: true, handle } });

        await triggerKey('KeyR', { repeat: true });

        expect(handle).toHaveBeenCalled();
    });

    it('updates handler with new props', async () => {
        const handle = vi.fn();
        const newHandle = vi.fn();

        const { rerender } = render(TestHotkey, { props: { code: 'KeyC', handle } });
        await rerender({ code: 'KeyD', handle: newHandle });

        await triggerKey('KeyC');
        await triggerKey('KeyD');

        expect(handle).not.toHaveBeenCalled();
        expect(newHandle).toHaveBeenCalled();
    });
});
