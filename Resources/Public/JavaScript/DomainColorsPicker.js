import Vue from 'https://unpkg.com/vue@2.6.0/dist/vue.esm.browser.min.js';
import ColorPicker from "@typo3/backend/color-picker.js";
import $ from "jquery";

// app Vue instance
let app = new Vue({
    // app initial state
    data: {
        // qcDomainColors is declared in EXT:qc_be_domain_color/Resources/Private/Templates/DomainColorFields.html
        domainColors: qcDomainColors || [],
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

export {app}
