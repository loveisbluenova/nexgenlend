(function( $ ) {

    jQuery(document).ready(function($) {

        var gformId = ompaapplication.ompaformid;

        var numberOnly = new RegExp("^[0-9]*$"),
            stringOnly = new RegExp("^[a-zA-Z ]*$");
            alphanumericOnly = new RegExp("^[a-zA-Z0-9 /-]*$");

        jQuery('body').on('focusout keypress keyup','.ompa_main_contain_row .ompa_main.ompa_only_number_allow input',function(){

            var fieldvalue = jQuery(this).val();

            if(!numberOnly.test(fieldvalue)){
                var newvalue= fieldvalue.substr(0, fieldvalue.length - 1);
                jQuery(this).attr('value',newvalue);
            }
        });

        jQuery('body').on('focusout keypress keyup','.ompa_main_contain_row .ompa_main.ompa_alphabetic_allow input',function(){

            var fieldvalue = jQuery(this).val();

            if(!stringOnly.test(fieldvalue)){
                var newvalue= fieldvalue.substr(0, fieldvalue.length - 1);
                jQuery(this).attr('value',newvalue);
            }
        });

        jQuery('body').on('focusout keypress keyup','.ompa_main_contain_row .ompa_main.ompa_alphanumeric_allow input',function(){

            var fieldvalue = jQuery(this).val();

            if(!alphanumericOnly.test(fieldvalue)){
                var newvalue= fieldvalue.substr(0, fieldvalue.length - 1);
                jQuery(this).attr('value',newvalue);
            }
        });


        jQuery('body #gform_wrapper_'+gformId).addClass('ompa_main_contain_row');
        //jQuery('form#gform_'+gformId+' .gform_body ul#gform_fields_'+gformId).addClass('ompa_main_contain_row');

        jQuery('body').on('change','select.custom_change_additional_income',function() {

            //var formcounter = 2;
            var formcounter = jQuery('.ompa_main_contain_row ul li #main_income_additional .income_additional_more_row').length;
            formcounter = formcounter + 1;

            if( formcounter > 5 ) {
               //alert('You cannot add more than five additional sources for income.');
                $.alert({
                    title: '',
                    content: 'You cannot add more than five additional sources for income.',
                    columnClass: 'custom-alert-ompa'
                });
            } else {

                jQuery(this).removeClass('custom_change_additional_income');

                var selecteValueArr = ['2nd Job','Overtime','Bonus','Commission','Contract Labor','Social Security','Alimony/Child Support','Retirement','Net Rental Income','Dividends/Interest','Other'];

                var selectHtml ='';


                selectHtml +='<div class="income_additional_more_row">';
                selectHtml +='<div class="ginput_container ginput_container_label"><p><b>Add An Additional Source If Applicable.</b></p></div>';
                selectHtml +='<div class="ginput_container ginput_container_text">';
                selectHtml +='<input name="input_21_'+formcounter+'" id="input_'+gformId+'_21_'+formcounter+'" type="text" value="" tabindex="1016" class="large" placeholder="Additional Monthly Income $..." aria-invalid="false">';
                selectHtml +='</div>';
                selectHtml +='<div class="ginput_container ginput_container_select">';
                selectHtml +='<select name="input_22_'+formcounter+'" id="input_'+gformId+'_22_'+formcounter+'" tabindex="1016" class="large gfield_select custom_change_additional_income" aria-invalid="false">';
                selectHtml +='<option value="" selected="selected" class="gf_placeholder">Source of Additional Income</option>';

                jQuery.each(selecteValueArr, function(index, value) {
                    selectHtml +='<option value="'+value+'">'+value+'</option>';
                });

                selectHtml +='</select>';
                selectHtml +='</div>';
                selectHtml +='</div>';

                jQuery('#main_income_additional .income_additional_more_row:last-child').after(selectHtml);
            }

            //formcounter = formcounter + 1;
        });

        jQuery('body').on('change','select.custom_co_bro_change_additional_income',function() {

            //var coformcounter = 2;
            var coformcounter = jQuery('.ompa_main_contain_row ul li #main_co_bro_income_additional .income_co_bro_additional_more_row').length;
            coformcounter = coformcounter + 1;

            if( coformcounter > 5 ) {
                //alert('You cannot add more than five additional sources for income.');
                $.alert({
                    title: '',
                    content: 'You cannot add more than five additional sources for income.',
                    columnClass: 'custom-alert-ompa'
                });
            } else {

                jQuery(this).removeClass('custom_co_bro_change_additional_income');

                var selecteValueArr = ['2nd Job','Overtime','Bonus','Commission','Contract Labor','Social Security','Alimony/Child Support','Retirement','Net Rental Income','Dividends/Interest','Other'];

                var selectHtml ='';


                selectHtml +='<div class="income_co_bro_additional_more_row">';
                selectHtml +='<div class="ginput_container ginput_container_label"><p><b>Add An Additional Source If Applicable.</b></p></div>';
                selectHtml +='<div class="ginput_container ginput_container_text">';
                selectHtml +='<input name="input_77_'+coformcounter+'" id="input_'+gformId+'_77_'+coformcounter+'" type="text" tabindex="1062" value="" class="large" placeholder="Additional Monthly Income $..." aria-invalid="false">';
                selectHtml +='</div>';
                selectHtml +='<div class="ginput_container ginput_container_select">';
                selectHtml +='<select name="input_78_'+coformcounter+'" id="input_'+gformId+'_78_'+coformcounter+'" tabindex="1062" class="large gfield_select custom_co_bro_change_additional_income" aria-invalid="false">';
                selectHtml +='<option value="" selected="selected" class="gf_placeholder">Source of Additional Income</option>';

                jQuery.each(selecteValueArr, function(index, value) {
                    selectHtml +='<option value="'+value+'">'+value+'</option>';
                });

                selectHtml +='</select>';
                selectHtml +='</div>';
                selectHtml +='</div>';

                jQuery('#main_co_bro_income_additional .income_co_bro_additional_more_row:last-child').after(selectHtml);
            }

            //coformcounter = coformcounter + 1;
        });

        jQuery('body').on('change focusout','.ompa_main_contain_row .gform_body ul li.ompa_main input',function (e){

            var data = {
                'action': 'gfdp_save',
                'form': jQuery('form.gfdp#gform_'+gformId).serialize()
            };

            jQuery.post(ompaapplication.ajaxurl, data, function(response) {
                if( response == 'form saved') {
                    $.removeCookie('gfdp');
                }
            });
        });

        jQuery('body').on('change focusout','.ompa_main_contain_row .gform_body ul li.ompa_main select',function (e){

            var data = {
                'action': 'gfdp_save',
                'form': jQuery('form.gfdp#gform_'+gformId).serialize()
            };

            jQuery.post(ompaapplication.ajaxurl, data, function(response) {
                if( response == 'form saved') {
                    $.removeCookie('gfdp');
                }
            });
        });
        //$('#input_15_8').mask("00/00/0000", {placeholder: "__/__/____"});
    });
})( jQuery );
