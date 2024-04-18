<svelte:options customElement="{{
    tag: 'qc-domain-color-pickers',
    shadow: 'none',
    props: {
        domainColors: {attribute: 'domain-colors', type:'Object'},
        conf: {attribute:'data-conf', type:'Object'}
    }
}}"/>
<script>
    import {Color, ColorInput} from 'color-picker-svelte'
    import {onMount} from 'svelte';

    export let domainColors = [];

    let domainName = '';
    $: isEmptyDomainName = domainName.trim() === "";
    $: colors = [];
    $: {
        for(let i = 0; i <  colors.length; i++){
            domainColors[i].color = colors[i].color.toHexString();
            domainColors[i].domain = colors[i].domain;
        }
        domainColorsJson = JSON.stringify(domainColors)
        colors = colors;
    }
    let domainColorsJson = '{}';
    function addNewDomain(e) {
        e.preventDefault();
        colors.push({
            'domain' : domainName,
            'color' : new Color("#CCC")
        })
        colors=[...colors];
        domainColors.push({'domain':domainName, color : '#CCC', errorClass :''})
        domainName = ''
        domainColorsJson = JSON.stringify(domainColors)
        colors = colors;
    }

    function deleteDomainColor(event, domainColor) {
        event.preventDefault();
        const targetIndex = colors.findIndex(item => item.domain === domainColor);
        if (targetIndex !== -1) {
            colors.splice(targetIndex, 1);
        }
        domainColors = domainColors.filter(item => item.domain !== domainColor);
        domainColorsJson = JSON.stringify(domainColors)
        colors = colors;
    }

    onMount(() => {
        domainColors.forEach((obj, index) => {
            if(obj.color !== undefined){
                let color = {
                    'domain' : obj.domain,
                    'color' : new Color(obj.color)
                };
                colors.push(color);
                colors = [...colors];
            }
        });
    });
</script>
<div class="container">
    <style>
        .svelte-s8w54d {
            height : 85%;
        }
        .svelte-s8w54d .show {
            padding-top: 5px;
         }

    </style>
    <input
        type="hidden"
        name="data[tx_qc_be_domain_color]"
        bind:value={domainColorsJson}
        id="field_tx_qc_be_domain_color"
    />
    <div class="row">
        <div class="form-group t3js-formengine-validation-marker
                    t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4">
            <div class="formengine-field-item t3js-formengine-field-item ">
                <div class="form-control-wrap">
                    <div class="form-wizards-wrap">
                        <div class="form-wizards-element">
                            <input id="new-domain"
                                   bind:value={domainName}
                                   autocomplete="off"
                                   placeholder="Valid regexp, e.g. prod, dev.*, etc"
                                   class="new-domain form-control"
                            />
                  <!--          <span class="error-message" style="color: red;">
                              {domainName && !/^([A-Za-z]{3})$/.test(domainName) ? "Invalid regexp" : ""}
                            </span>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group t3js-formengine-validation-marker
                    t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4">
            <div class="formengine-field-item t3js-formengine-field-item ">
                <div class="form-control-wrap">
                    <div class="btn-group">
                        <button on:click={addNewDomain} disabled={isEmptyDomainName} class="btn btn-default">
                            New domain
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {#each Array.from(colors) as color, index}
        <div class="d-flex mb-3">
            <div class="form-control-wrap">
                <div class="form-wizards-wrap">
                    <div class="form-wizards-element pr-2">
                        <input type="text" bind:value={color.domain} class="edit form-control">
                    </div>
                </div>
            </div>
            <div class="t3js-formengine-validation-marker">
                <div class="formengine-field-item t3js-formengine-field-item">
                    <div class="form-control-wrap" style="max-width: 156px">
                        <div class="form-wizards-wrap">
                            <div class="form-wizards-element" >
                                <ColorInput bind:color={colors[index].color} showAlphaSlider/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="t3js-formengine-validation-marker checkbox-column  col-md-2 col-sm-3">
                <div class="formengine-field-item t3js-formengine-field-item">
                    <div class="form-control-wrap">
                        <div class="form-wizards-wrap">
                            <div class="form-wizards-element">
                                <button
                                    class="btn btn-default  t3js-editform-delete-record"
                                    on:click={() => deleteDomainColor(event,color.domain)}
                                    >
                                    <span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete" data-identifier="actions-edit-delete">
                                        <span class="icon-markup">
                                            <svg class="icon-color" role="img"><use xlink:href="./actions.svg#actions-delete"></use></svg>
                                        </span>
	                                </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
