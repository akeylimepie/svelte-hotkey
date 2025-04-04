import { on } from "svelte/events";
import type { Action } from "svelte/action";

type Keys = Pick<KeyboardEvent, 'metaKey' | 'shiftKey' | 'ctrlKey' | 'altKey' | 'code'>

type HotkeyParams = Partial<Keys> & { allowRepeat?: boolean, handle?: () => void };

const keys: Array<keyof Keys> = ['metaKey', 'shiftKey', 'ctrlKey', 'altKey', 'code']

export const hotkey: Action<HTMLElement, HotkeyParams> = (node, data) => {
    let params = data

    const destroy = on(window, 'keydown', (event: KeyboardEvent) => {
        if (event.repeat && !params.allowRepeat)
            return

        if (keys.reduce((ok, key) => {
            return ok && (params[key] === undefined ? !event[key] : params[key] === event[key])
        }, true)) {
            event.preventDefault()
            params.handle ? params.handle() : node.click()
        }
    })

    return {
        update: (data) => {
            params = data
        },
        destroy
    }
}