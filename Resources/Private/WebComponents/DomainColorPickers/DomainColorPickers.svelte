<svelte:options customElement="{{
    tag: 'qc-domain-color-pickers',
    shadow: 'none',
    props: {
        domainColors: {attribute: 'domain-colors', type:'Object'},
        conf: {attribute:'data-conf', type:'Object'}
    }
}}"/>
<script>
    export let
        domainColors = {},
        conf = {}

</script>
{conf.title}
<span class="red">foo</span>
{#each Object.entries(domainColors) as [key,value]}
    {key} : {value}
{/each}