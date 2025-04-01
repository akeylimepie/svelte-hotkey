<script>
    import { hotkey } from '$lib'

    let times = $state(0)

    let active = $state(false)

    let digit = $state(1)

    const toggle = () => active = !active
</script>

<svelte:window use:hotkey={{metaKey: true, code: 'KeyK', handle: ()=>alert('Pressed Cmd+K')}}/>

<p>
    Press <kbd>Cmd+K</kbd> for alert
</p>

<button
        onclick={toggle}
        use:hotkey={{metaKey: true, shiftKey: true, code: 'KeyK', handle: toggle}}
>
    Toggle <kbd>Cmd+Shift+K</kbd>
</button>

{#if active}
    <div>
        <button
                onclick={()=>times++}
                use:hotkey={{metaKey: true, shiftKey: true, allowRepeat:true, code: `Digit${digit}`}}
        >Press <kbd>Cmd+Shift+{digit}</kbd></button>

        <button onclick={()=>digit++}>Change hotkey</button>
    </div>
{/if}

{#if times}
    <p>Times: {times}</p>
{/if}

<style>
    kbd {
        background: antiquewhite;
    }
</style>