<svelte:options customElement='{{
    tag:"qc-test",
    shadow:'none'
}}' />

<script>

    import fixtures from "../fixtures.js";
    import conf from "../conf.js";
    import DomainColorPickers from "../DomainColorPickers.svelte";
</script>


<qc-domain-color-pickers
        data-conf='{JSON.stringify(conf)}'
        domain-colors='{JSON.stringify(fixtures)}'>
</qc-domain-color-pickers>
