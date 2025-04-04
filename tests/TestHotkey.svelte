<script lang="ts">
    import { hotkey } from '$lib';

    let {
        code,
        ctrlKey,
        metaKey,
        shiftKey,
        altKey,
        allowRepeat,
        handle
    }: Parameters<typeof hotkey>[1] = $props()
</script>

<button
        use:hotkey={{
		code,
		ctrlKey,
		metaKey,
		shiftKey,
		altKey,
		allowRepeat,
		handle
	}}
>
    Hotkey Button
</button>
