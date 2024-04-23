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

    export let
        domainColors = [],
        conf = {}
    let domainNameRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
    $: validInput = false;
    let domainName = '';
    $: {
        validInput = domainName.length > 0 && domainNameRegex.test(domainName);
        validInput = validInput;
    }
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
{#if conf.placeholder !== undefined}
    <div>
        <style>
            .svelte-s8w54d {
                height : 84%;
            }
            .input.svelte-s8w54d.svelte-s8w54d  {

                background-color: #fefefe;
                background-clip: padding-box;
                border: var(--bs-border-width) solid #bbb;
                border-radius: var(--bs-border-radius);
                box-shadow: var(--bs-box-shadow-inset);
                transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            }

            .input-group .btn {
                height: 105%;
            }
            .svelte-s8w54d .show {
                padding-top: 5px;
            }
            .svelte-s8w54d:focus-within{
                color: #333;
                background-color: #fefefe;
                border-color: #80bcf3;
                outline: 0;
                box-shadow: var(--bs-box-shadow-inset), 0 0 0 .25rem rgba(0, 120, 230, .25);
            }
            .input-element {
                margin-right : 7px;
            }
        </style>
        <input
            type="hidden"
            name="data[tx_qc_be_domain_color]"
            bind:value={domainColorsJson}
            id="field_tx_qc_be_domain_color"
            class="d-none"
        />
        <div class="row">
            <span class="text-muted">{conf.description}</span>
            <div class="form-group t3js-formengine-validation-marker
                    t3js-formengine-palette-field checkbox-column col-sm-6 col-md-4">
                <div class="formengine-field-item t3js-formengine-field-item ">
                    <div class="form-control-wrap">
                        <div class="form-wizards-wrap">
                            <div class="form-wizards-element">
                                <input id="new-domain"
                                       bind:value={domainName}
                                       autocomplete="off"
                                       placeholder={conf.placeholder}
                                       class="new-domain form-control mb-2"
                                />
                                <span class="error-message" style="color: red;">
                                    {(validInput == true || domainName.length == 0) ? "" : conf.regexpError  }
                                </span>
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
                            <button on:click={addNewDomain} disabled={validInput == false} class="btn btn-default">
                                {conf.buttonLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {#each Array.from(colors) as color, index}
            <div class="d-flex mb-3">
                <div class="form-control-wrap input-element">
                    <div class="form-wizards-wrap">
                        <div class="form-wizards-element pr-2">
                            <input type="text" bind:value={color.domain} class="edit form-control" disabled="disabled">
                        </div>
                    </div>
                </div>
                <div class="t3js-formengine-validation-marker">
                    <div class="formengine-field-item t3js-formengine-field-item">
                        <div class="form-control-wrap input-element"  style="max-width: 126px">
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
                        <div class="form-control-wrap input-element">
                            <div class="form-wizards-wrap">
                                <div class="form-wizards-element">
                                    <button
                                        class="btn btn-default  t3js-editform-delete-record"
                                        on:click={() => deleteDomainColor(event,color.domain)}
                                    >
                                    <span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete" data-identifier="actions-edit-delete">
                                        <span class="icon-markup">
                                            <svg class="icon-color" role="img"><use xlink:href="/typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/actions.svg#actions-delete"></use></svg>
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
{/if}
