import $ from "jquery";
import AjaxRequest from "@typo3/core/ajax/ajax-request.js";
$( document ).ready(function(){
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
