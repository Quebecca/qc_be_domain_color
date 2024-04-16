<svelte:options customElement='{{
    tag:"qc-test",
    shadow:'none'
}}' />

<script>
    // import Debug from "pgu_web_components/Resources/Private/Debug.svelte";

    import fixtures from "../fixtures.js";
    import conf from "../conf.js";
    import DomainColorPickers from "../DomainColorPickers.svelte";
</script>

<!--<DomainColorPickers-->
<!--    conf={conf}-->
<!--    domainColors={fixtures}/>-->

<qc-domain-color-pickers
        data-conf='{JSON.stringify(conf)}'
        domain-colors='{JSON.stringify(fixtures)}'/>