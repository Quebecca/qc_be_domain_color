define([
   'jquery', 'TYPO3/CMS/Backend/ColorPicker', 'vue',
], function ($, ColorPicker) {
    'use strict';

    // app Vue instance
    let app = new Vue({
        // app initial state
        data: {
            // pguDomainColors is declared in EXT:pgu_be_domaincolor/Resources/Private/Templates/DomainColorFields.html
            domainColors: pguDomainColors || [],
            newDomain:'',
            newDomainHasErrorClass: '',
            editedDomainColor: null,
            initColorPickers: true,
        },
        computed: {
            domainColorsJson: function () {
                return JSON.stringify(this.domainColors);
            }
        },
        mounted: function () {
            update()
        },
        updated: function () {
            update()
        },

        methods: {

            validateEdit: function (domainColor) {
                domainColor.errorClass = this.getErrorClass(domainColor.domain);
                // console.log('validateEdit : ' + domainColor.errorClass)
            },

            validateNew: function (domain) {
                this.newDomainHasErrorClass = this.getErrorClass(domain);
                // console.log('validateNew : ' + this.newDomainHasErrorClass)
            },

            // validate that the regexp is valid
            getErrorClass: function (domain) {
                try {
                    new RegExp('/' + domain + '/');
                } catch(e) {
                    return 'has-error';
                }
                return '';
            },

            add: function(event) {

                let domain = this.newDomain && this.newDomain.trim();
                if (!domain || this.newDomainHasErrorClass !== '') {
                    return false;
                }
                this.domainColors.push({
                    domain: domain,
                    color: '',
                    errorClass: ''
                });
                this.newDomain = "";

                this.initColorPickers = true;

            },

            remove: function(domainColor) {
                // console.log('remove: ', this.domainColors.indexOf(domainColor));
                this.domainColors.splice(this.domainColors.indexOf(domainColor), 1);
            }

        },

        // a custom directive to wait for the DOM to be updated
        // before focusing on the input field.
        // http://vuejs.org/guide/custom-directive.html
        directives: {
            "domaincolor-focus": function(el, binding) {
                if (binding.value) {
                    el.focus();
                }
            }
        }
    });


    // mount
    app.$mount(".domainColorapp");

    function update () {
        if ( app.initColorPickers)  {
            app.initColorPickers = false;
            // console.log('init color pickers');
            ColorPicker.initialize();

            $('.t3js-color-picker').change(function () {
                let index = $(this).data('formengine-input-name').split('-')[2]
                // console.log(id);
                app.domainColors[index].color = $(this).val();

            })

        }
    }
    return app;
});