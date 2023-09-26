# svelte-hotkey

An action to add a keyboard shortcut.

## Usage

```svelte
<script>
    import { hotkey } from 'svelte-hotkey'

    let times = 0

    const action = () => {
        times++
    }
</script>

<svelte:window use:hotkey={{metaKey: true, code: 'KeyK', handle:()=>alert('Pressed Cmd+K')}}/>

<p>
    Press <kbd>[Cmd+K]</kbd> for alert
</p>

<button
        on:click={action}
        use:hotkey={{metaKey: true, shiftKey: true, code: 'Digit1'}}
>Press <kbd>[Cmd+Shift+1]</kbd></button>

{#if times}
    <p>Times: {times}</p>
{/if}
```
