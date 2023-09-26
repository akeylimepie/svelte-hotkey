type Keys = Pick<KeyboardEvent, 'metaKey' | 'shiftKey' | 'ctrlKey' | 'altKey' | 'code'>

type Params = Keys & { handle?: () => void };

const keys: Array<keyof Keys> = ['metaKey', 'shiftKey', 'ctrlKey', 'altKey', 'code']

export function hotkey<T extends HTMLElement> (node: T, params: Params) {
    let destroy = () => {}

    const update = (params: Params) => {
        destroy()

        function handler (event: KeyboardEvent) {
            if (keys.reduce((ok, key) => {
                return ok && (params[key] === undefined ? !event[key] : params[key] === event[key])
            }, true)) {
                event.preventDefault()
                params.handle ? params.handle() : node.click()
            }
        }

        window.addEventListener('keydown', handler)

        destroy = () => {
            window.removeEventListener('keydown', handler)
        }
    }

    update(params)

    return { update, destroy }
}