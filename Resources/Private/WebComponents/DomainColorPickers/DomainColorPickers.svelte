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
    $: validInput = false;
    let domainName = '';
    $: {
        validInput = isValidDomainName(domainName);
        validInput = validInput;
    }
    $: colors = [];
    $: {
        for (let i = 0; i < colors.length; i++) {
            domainColors[i].color = colors[i].color.toHexString();
            domainColors[i].domain = colors[i].domain;
        }
        domainColorsJson = JSON.stringify(domainColors)
        colors = colors;
    }
    let domainColorsJson = '{}';

    function isValidDomainName(domain) {
        try {
            new RegExp('/' + domain + '/');
        } catch (e) {
            return false;
        }
        return true;
    }

    function addNewDomain(e) {
        e.preventDefault();
        colors.push({
            'domain': domainName,
            'color': new Color("#CCC")
        })
        colors = [...colors];
        domainColors.push({'domain': domainName, color: '#CCC', errorClass: ''})
        domainName = ''
        domainColorsJson = JSON.stringify(domainColors)
        colors = colors;
    }

    function deleteDomainColor(event, index) {
        event.preventDefault();
        colors.splice(index, 1);
        domainColors.splice(index, 1)
        domainColorsJson = JSON.stringify(domainColors)
        colors = colors;
    }

    onMount(() => {
        domainColors.forEach((obj, index) => {
            if (obj.color !== undefined) {
                let color = {
                    'domain': obj.domain,
                    'color': new Color(obj.color)
                };
                colors.push(color);
                colors = [...colors];
            }
        });
    });

    function moveDomainColor(event, action, index) {
        event.preventDefault();
        let targetIndex = action === 'toDown' ? index + 1 : index - 1;
        let currentColor = colors[index]
        let targetColor = colors[targetIndex]
        colors[targetIndex] = currentColor;
        colors[index] = targetColor;
        colors = [...colors]
    }
</script>
{#if conf.placeholder !== undefined}
    <style>
        .svelte-s8w54d {
            height: 84%;
        }

        .input.svelte-s8w54d.svelte-s8w54d {

            background-color: #fefefe;
            background-clip: padding-box;
            border: var(--bs-border-width) solid #bbb;
            border-radius: var(--bs-border-radius);
            box-shadow: var(--bs-box-shadow-inset);
            transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        }

        .moveDomainColor {
            width: 50%;
        }

        .svelte-s8w54d .show {
            padding-top: 5px;
        }

        .svelte-s8w54d:focus-within {
            color: #333;
            background-color: #fefefe;
            border-color: #80bcf3;
            outline: 0;
            box-shadow: var(--bs-box-shadow-inset), 0 0 0 .25rem rgba(0, 120, 230, .25);
        }

        .to-top-section {
            padding-left : 0 !important;
            padding-right : 0 !important;
            button {
                width : 55%
            }
        }
        .to-down-section {
            padding-left : 0 !important;
        }
        .error-message-section {
            margin-top : -20px;
            color: red;
        }
        .error-message {
            color: red;
        }
        .color-picker {
            max-width: 126px
        }
        .invalidInput {
            border: 2px solid red;
        }

        .invalidInput:focus {
            border: 2px solid red;
        }

        .input-element {
            margin-right: 7px;
        }
    </style>
    <div>
        <input
                type="hidden"
                name="data[tx_qc_be_domain_color]"
                bind:value={domainColorsJson}
                id="field_tx_qc_be_domain_color"
                class="d-none"
        />
        <div class="row">
            <div>
                <span class="text-muted">{conf.description}</span>
                <span class="text-muted">{conf.description_2}</span>
            </div>

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
                                       class:invalidInput={!validInput}
                                />
                                <span class="error-message">
                                    { validInput === true ? "" : conf.regexpError  }
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
            <div class="d-flex align-items-start flex-column mb-3">
                <div class="mb-0">
                    <div class="d-flex">
                        <div class="form-control-wrap input-element">
                            <div class="form-wizards-wrap">
                                <div class="form-wizards-element pr-2">
                                    <input
                                            type="text"
                                            bind:value={color.domain}
                                            class="edit form-control mb-2"
                                            class:invalidInput={!isValidDomainName(color.domain)}
                                    />

                                </div>
                            </div>
                        </div>
                        <div class="t3js-formengine-validation-marker">
                            <div class="formengine-field-item t3js-formengine-field-item">
                                <div class="form-control-wrap input-element color-picker">
                                    <div class="form-wizards-wrap">
                                        <div class="form-wizards-element">
                                            <ColorInput bind:color={colors[index].color} showAlphaSlider/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {#if index > 0}
                            <div class="p-2 to-top-section">
                                <button
                                        class="btn btn-default  t3js-editform-delete-record moveDomainColor"
                                        on:click={() => moveDomainColor(event,'toTop',index)}
                                >
                          <span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete"
                                data-identifier="actions-edit-delete">
                                    <span class="icon-markup">
                                        <svg class="icon-color" role="img"><use
                                                xlink:href="/typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/actions.svg#actions-arrow-up"></use></svg>
                                    </span>
                                </span>
                                </button>
                            </div>
                        {/if}
                        {#if colors.length > index + 1}
                            <div class="p-2 to-down-section">
                                <button
                                        class="btn btn-default  t3js-editform-delete-record moveDomainColor"
                                        on:click={() => moveDomainColor(event,'toDown',index)}
                                >
                            <span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete"
                                  data-identifier="actions-edit-delete">
                                    <span class="icon-markup">
                                        <svg class="icon-color" role="img"><use
                                                xlink:href="/typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/actions.svg#actions-arrow-down"></use></svg>
                                    </span>
                                </span>
                                </button>
                            </div>
                        {/if}

                        <div class="p-2">
                            <button
                                    class="btn btn-default  t3js-editform-delete-record"
                                    on:click={() => deleteDomainColor(event,index)}
                            >
                                <span class="t3js-icon icon icon-size-small icon-state-default icon-actions-edit-delete"
                                      data-identifier="actions-edit-delete">
                                    <span class="icon-markup">
                                        <svg class="icon-color" role="img"><use
                                                xlink:href="/typo3/sysext/core/Resources/Public/Icons/T3Icons/sprites/actions.svg#actions-delete"></use></svg>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="error-message-section">
                    <span class="error-message">
                                { isValidDomainName(color.domain) === true ? "" : conf.regexpError + conf.ignoredItem  }
                        </span>
                </div>
            </div>
        {/each}
    </div>
{/if}
