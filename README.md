# svelte-hotkey

A simple keyboard shortcut action for Svelte 5.

---

## Install

```bash
npm install svelte-hotkey
```

---

## Usage

```svelte
<script lang="ts">
	import { hotkey } from 'svelte-hotkey';

	function showCommandPalette() {
		console.log('Open command palette');
	}
</script>

<button use:hotkey={{ ctrlKey: true, code: 'KeyK', handle: showCommandPalette }}>
	Ctrl + K
</button>
```

Pressing `Ctrl + K` triggers the `showCommandPalette` function.

When `handle` is omitted, clicking the element is used as the default behavior.

```svelte
<button
	use:hotkey={{ shiftKey: true, code: 'Enter'  }}>
	Send
</button>
```

---

## Parameters

| Name          | Type                      | Description                                                                                                                         |
|---------------|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| `code`        | `string`                  | The [`KeyboardEvent.code`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code) to match (e.g. `'KeyS'`, `'Enter'`) |
| `ctrlKey`     | `boolean` _(optional)_    | Require the Ctrl key                                                                                                                |
| `metaKey`     | `boolean` _(optional)_    | Require the Meta key                                                                                                                |
| `shiftKey`    | `boolean` _(optional)_    | Require the Shift key                                                                                                               |
| `altKey`      | `boolean` _(optional)_    | Require the Alt key                                                                                                                 |
| `handle`      | `() => void` _(optional)_ | Custom handler function                                                                                                             |
| `allowRepeat` | `boolean` _(optional)_    | Allow repeated key events (default: `false`)                                                                                        |

---

## License

MIT
