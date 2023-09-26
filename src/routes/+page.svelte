<script>
    import { hotkey } from '$lib'

    let times = 0

    const action = () => {
        times++
    }

    let active = false

    let digit = 1
</script>

<svelte:window use:hotkey={{metaKey: true, code: 'KeyK', handle:()=>alert('Pressed Cmd+K')}}/>

<p>
    Press <kbd>[Cmd+K]</kbd> for alert
</p>

<button on:click={()=>active=!active}>Toggle</button>

{#if active}
    <div>
        <button
                on:click={action}
                use:hotkey={{metaKey: true, shiftKey: true, code: `Digit${digit}`}}
        >Press <kbd>[Cmd+Shift+{digit}]</kbd></button>

        <button on:click={()=>digit++}>Change hotkey</button>

        {#if times}
            <p>Times: {times}</p>
        {/if}
    </div>
{/if}