import $ from "jquery";
import AjaxRequest from "@typo3/core/ajax/ajax-request.js";

$( document ).ready(function(){
  // Rendering the Svelte component
  let labels = document.getElementById("labels").dataset.labels;
  let qcDomainColors = document.getElementById("qcDomainColors").dataset.qcdomaincolors ?? '[{}]';
  let qcElement = document.createElement('qc-domain-color-pickers');
  qcElement.setAttribute('domain-colors',qcDomainColors);
  qcElement.setAttribute('conf', labels)
  document.getElementById('qc-be-domain-color').appendChild(qcElement);

  // Saving action
  $('button[name="data[save]"]').click(function (){
    let colors = $('#field_tx_qc_be_domain_color').val();
    new AjaxRequest(TYPO3.settings.ajaxUrls.save_colors)
      .withQueryArguments({colors: colors})
      .get()
      .then(async function (response) {})
        .catch(function (response){
          console.log(response)
      })
  })
})
