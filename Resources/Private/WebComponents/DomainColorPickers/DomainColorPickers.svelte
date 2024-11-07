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
    }
    let domainColorsJson = '{}';

    /**
     * Check if the domain name is valid
     * @param domain
     */
    function isValidDomainName(domain) {
        try {
            new RegExp('/' + domain + '/');
        } catch (e) {
            return false;
        }
        return true;
    }

    /**
     * Handle pressing "Enter" key
     * @param event
     */
    function handleKeyDown(event){
        if (event.key === 'Enter') {
            addNewDomain(event);
        }
    }

    /**
     * Add new domain color
     * @param event
     */
    function addNewDomain(event) {
        event.preventDefault();
        colors = [
            ...colors,
            {
                domain: domainName,
                color: new Color("#CCC")
            }
        ];
        domainColors = [
            ...domainColors,
            {
                domain: domainName,
                color: '#CCC',
                errorClass: ''
            }
        ];
        domainName = ''
    }

    /**
     * Deleting a domain color
     * @param event
     * @param index
     */
    function deleteDomainColor(event, index) {
        event.preventDefault();
        colors = colors.filter((_, i) => i !== index);
        domainColors = domainColors.filter((_, i) => i !== index);
    }

    onMount(() => {
        domainColors.forEach((obj, index) => {
            if (obj.color !== undefined) {
                let color = {
                    'domain': obj.domain,
                    'color': new Color(obj.color)
                };
                colors = [...colors, color];
            }
        });
    });

    /**
     * Moving domain color
     * @param event
     * @param action
     * @param index
     */
    function moveDomainColor(event, action, index) {
        event.preventDefault();
        let targetIndex = action === 'toDown' ? index + 1 : index - 1;
        let currentColor = colors[index]
        let targetColor = colors[targetIndex]
        colors[targetIndex] = currentColor;
        colors[index] = targetColor;
    }
</script>
{#if conf.placeholder !== undefined}
    <style lang="scss">
        .arrow-down-icon {
            background-image: url("data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxnIGZpbGw9ImN1cnJlbnRDb2xvciI+PHBhdGggZD0iTTcgMnY3LjNINWMtLjQgMC0uNi41LS40LjhsMyAzLjdjLjIuMi42LjIuOCAwbDMtMy43Yy4yLS4zIDAtLjgtLjQtLjhIOVYySDd6Ii8+PC9nPjwvc3ZnPg0K");
        }

        .arrow-up-icon {
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNOSAxNFY2LjdoMmMuNCAwIC42LS41LjQtLjhsLTMtMy43Yy0uMi0uMi0uNi0uMi0uOCAwbC0zIDMuN2MtLjIuMyAwIC44LjQuOGgyVjE0aDJ6Ii8+PC9nPjwvc3ZnPg0K");
        }

        .delete-icon {
            background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiI+PGcgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBkPSJNNyA1SDZ2OGgxek0xMCA1SDl2OGgxeiIvPjxwYXRoIGQ9Ik0xMyAzaC0ydi0uNzVDMTEgMS41NiAxMC40NCAxIDkuNzUgMWgtMy41QzUuNTYgMSA1IDEuNTYgNSAyLjI1VjNIM3YxMC43NWMwIC42OS41NiAxLjI1IDEuMjUgMS4yNWg3LjVjLjY5IDAgMS4yNS0uNTYgMS4yNS0xLjI1VjN6bS03LS43NUEuMjUuMjUgMCAwIDEgNi4yNSAyaDMuNWEuMjUuMjUgMCAwIDEgLjI1LjI1VjNINnYtLjc1em02IDExLjVhLjI1LjI1IDAgMCAxLS4yNS4yNWgtNy41YS4yNS4yNSAwIDAgMS0uMjUtLjI1VjRoOHY5Ljc1eiIvPjxwYXRoIGQ9Ik0xMy41IDRoLTExYS41LjUgMCAwIDEgMC0xaDExYS41LjUgMCAwIDEgMCAxeiIvPjwvZz48L3N2Zz4NCg==");
        }

        .arrow-up-icon, .arrow-down-icon, .delete-icon {
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px 18px;
            height: 30px !important;
            width: 40px !important;
            padding: 10px;
            border: 1px solid var(--bs-btn-hover-border-color);
        }

        button {
            width: 100% !important;
        }

        /* CSS for the color picker component */
        .svelte-s8w54d {
            height: 84%;
        }

        .input.svelte-s8w54d.svelte-s8w54d {
            background-color: #fefefe;
            background-clip: padding-box;
            border: var(--bs-border-width) solid #bbb;
            border-radius: var(--bs-border-radius);
            box-shadow: var(--bs-box-shadow-inset);
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .svelte-s8w54d:focus-within {
            color: #333;
            background-color: #fefefe;
            border-color: #80bcf3;
            outline: 0;
            box-shadow: var(--bs-box-shadow-inset), 0 0 0 0.25rem rgba(0, 120, 230, 0.25);
        }

        .invalidInput {
            border: 2px solid red;
        }

        .invalidInput:focus {
            border: 2px solid red;
        }

        .delete-btn {
            margin-left: 25px;
        }

        .last-delete-btn {
            margin-left: 75px;
        }

        .moveDomainColor {
            width: 50%;
        }

        .svelte-s8w54d .show {
            padding-top: 5px;
        }

        .to-top-section {
            padding-left: 0 !important;
        }
        .to-top-section button {
            width: 55%;
        }

        .to-down-section {
            padding-left: 0 !important;
        }

        .error-message-section {
            margin-top: -20px;
            color: red;
        }

        .error-message {
            color: red;
        }

        .color-picker {
            max-width: 126px;
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
                                       on:keydown={handleKeyDown}
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
                            <button on:click={addNewDomain} disabled={validInput === false || domainName.length === 0} class="btn btn-default">
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
                                        class="arrow-up-icon btn btn-default  t3js-editform-delete-record moveDomainColor"
                                        on:click={() => moveDomainColor(event,'toTop',index)}
                                >
                                    {#if conf.toTopBtnLabel !== undefined}
                                        <span>{conf.toTopBtnLabel}</span>
                                    {/if}
                                </button>
                            </div>
                        {/if}
                        {#if colors.length > index + 1}
                            <div class="p-2 to-down-section">
                                <button
                                        class="arrow-down-icon btn btn-default  t3js-editform-delete-record moveDomainColor"
                                        on:click={() => moveDomainColor(event,'toDown',index)}
                                >
                                    {#if conf.toDownBtnLabel !== undefined}
                                        <span>{conf.toDownBtnLabel}</span>
                                    {/if}

                                </button>
                            </div>
                        {/if}

                        <div class="p-2 { (index === 0 || colors.length === index + 1 ) ? 'last-delete-btn' : 'delete-btn' }" >
                            <button
                                    class="delete-icon btn btn-default  t3js-editform-delete-record"
                                    on:click={() => deleteDomainColor(event,index)}
                            >
                                {#if conf.DeleteBtnLabel !== undefined}
                                    <span>{conf.DeleteBtnLabel}</span>
                                {/if}
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
