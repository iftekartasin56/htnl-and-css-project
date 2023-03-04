jQuery(document).ready(function($){
    let clr_gender, clr_gen, clr_age, clr_height, clr_weight, clr_activity, clr_h_unit = "cm", clr_w_unit = "kg";

    const nftd = Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });

    $(".calculator-step").on("click", function(){
        $(this).closest(".calculator-step").removeClass("is-invalid");
    });

    $("#calculator-gender-male-input").on("click", function(){
        clr_gender = $(this).data("value");
        clr_gen = $(this).data("abbreviation");
        $("#calculator-gender-female-input").removeClass("is-selected");
        $(this).addClass("is-selected");
    });

    $("#calculator-gender-female-input").on("click", function(){
        clr_gender = $(this).data("value");
        clr_gen = $(this).data("abbreviation");
        $("#calculator-gender-male-input").removeClass("is-selected");
        $(this).addClass("is-selected");
    });

    $("#daily-activities-wrapper .img-btn-container").on("click", function(){
        $("#daily-activities-wrapper .img-btn-container").removeClass("is-selected");
        $(this).addClass("is-selected");

        clr_activity = Number($(this).data("value"));
    });
    
    $(".calculator-step-height-choice").on("click", function(){
        clr_h_unit = $(this).val();
        if(clr_h_unit == "cm") {
            $("#calculator-step-height-cm-input-wrapper").removeClass("hidden");
            $("#calculator-step-height-ft-input-wrapper").addClass("hidden");
            $("#calculator-step-height-ft-input-wrapper input").val("");

            $("#calculator-step-weight-unit-kg").prop("checked", true);
            $("#calculator-step-weight-unit-lb").prop("checked", false);

            $(".kg-input-wrapper").removeClass("hidden");
            $(".lbs-input-wrapper").addClass("hidden");
            clr_w_unit = "kg";
        } else {
            $("#calculator-step-height-ft-input-wrapper").removeClass("hidden");
            $("#calculator-step-height-cm-input-wrapper").addClass("hidden");
            $("#calculator-step-height-cm-input-wrapper input").val("");

            $("#calculator-step-weight-unit-kg").prop("checked", false);
            $("#calculator-step-weight-unit-lb").prop("checked", true);
            
            $(".kg-input-wrapper").addClass("hidden");
            $(".lbs-input-wrapper").removeClass("hidden");
            clr_w_unit = "lb";
        }
        $("#calculator-step-height-cm, #calculator-step-height-feet, #calculator-step-height-inch, #calculator-step-weight-input-kg, #calculator-step-weight-input-lbs").val("");
    });
    
    $(".calculator-step-weight-choice").on("click", function(){
        clr_w_unit = $(this).val();
        if(clr_w_unit == "kg") {
            $("#calculator-step-height-cm-input-wrapper").removeClass("hidden");
            $("#calculator-step-height-ft-input-wrapper").addClass("hidden");
            $("#calculator-step-height-ft-input-wrapper input").val("");

            $("#calculator-step-weight-unit-kg").prop("checked", true);
            $("#calculator-step-weight-unit-lb").prop("checked", false);

            $(".kg-input-wrapper").removeClass("hidden");
            $(".lbs-input-wrapper").addClass("hidden");
            clr_h_unit = "cm";
        } else {
            $("#calculator-step-height-ft-input-wrapper").removeClass("hidden");
            $("#calculator-step-height-cm-input-wrapper").addClass("hidden");
            $("#calculator-step-height-cm-input-wrapper input").val("");

            $("#calculator-step-weight-unit-kg").prop("checked", false);
            $("#calculator-step-weight-unit-lb").prop("checked", true);
            
            $(".kg-input-wrapper").addClass("hidden");
            $(".lbs-input-wrapper").removeClass("hidden");
            clr_h_unit = "ft";
        }
        $("#calculator-step-height-cm, #calculator-step-height-feet, #calculator-step-height-inch, #calculator-step-weight-input-kg, #calculator-step-weight-input-lbs").val("");
    });

    $("#calculator-daily-calories-submit").on("click", function(){
        let rs_calorie = 0;

        getInputs();
        if(validateForm(1)){
            $(".yz-alert-danger").hide();
            
            rs_calorie = (10 * Number(clr_weight)) + (6.25 * Number(clr_height)) + (5 * Number(clr_age)) + Number(clr_gender);
            rs_calorie = rs_calorie * Number(clr_activity);

            $("#clr_rs_calorie").text(rs_calorie+" kcal");
            $("#clr_rs_sec").css({"display":"flex"});
            $('html, body').animate({
                scrollTop: $("#clr_rs_sec").offset().top
            }, 1000);
        } else {
            $(".yz-alert-danger").show();
            $("#clr_rs_sec").hide();
            $("#clr_rs_calorie").text("-");
        }
    });

    var isMobile = false; //initiate as false
    //device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }

    let left;
    if(isMobile){
        let sw = screen.width;
        let extra = sw - 228;
        extra = extra/2;
        left = extra;
    } else {
        let element = document.getElementById("clr_cl");
        var rect = element.getBoundingClientRect();
        left = 0;
        $("#calculator-line-graph").css({"left": left+"px"});
    }

    $("#calculator-imc-submit").on("click", function(){
        let rs_imc = 0;

        getInputs();
        if(validateForm(2)){
            $(".yz-alert-danger").hide();
            
            clr_height = clr_height/100;
            
            rs_imc = Number(clr_weight)/Math.pow(Number(clr_height),2);
            
            if(clr_gen == "m"){
                $("#bmi-underweight-max").text("19,0");
                $("#bmi-healthy-min").text("19,1");
                $("#bmi-healthy-max").text("24,0");
                $("#bmi-overweight-min").text("24,1");
                $("#bmi-overweight-max").text("29,0");
                $("#bmi-obese-min").text("29,1");
                $("#bmi-obese-max").text("38,9");
                $("#bmi-morbid-min").text("39,0");
            } else {
                $("#bmi-underweight-max").text("18,0");
                $("#bmi-healthy-min").text("18,1");
                $("#bmi-healthy-max").text("23,0");
                $("#bmi-overweight-min").text("23,1");
                $("#bmi-overweight-max").text("28,0");
                $("#bmi-obese-min").text("28,1");
                $("#bmi-obese-max").text("37,9");
                $("#bmi-morbid-min").text("38,0");
            }
            $(".result-popup-value").text(nftd.format(rs_imc));
            let x = 0;
            if(clr_gen == "m"){
                if(rs_imc >= 0 && rs_imc <= 19.0 ){
                    x = 228/19;
                    $(".indicator").css({"border-top-color" : "#ffc107"});
                    if(isMobile) {
                        $("#calculator-line-graph").css({"left": left+"px"});
                    }
                    $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#ffc107"});
                } else if(rs_imc >= 19.1 && rs_imc <= 24.0 ){
                    x = 228/5;
                    $(".indicator").css({"border-top-color" : "#8bc34a"});
                    
                    if(isMobile) {
                        $("#calculator-line-graph").css({"left": (left-228)+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#8bc34a"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+228+x)+"px", "background-color" : "#8bc34a"});
                    }
                } else if(rs_imc >= 24.1 && rs_imc <= 29.0 ){
                    x = 228/5;
                    $(".indicator").css({"border-top-color" : "#ffa726"});
                    
                    if(isMobile) {
                        $("#calculator-line-graph").css({"left": (left-(2*228))+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#8bc34a"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+(2*228)+x)+"px", "background-color" : "#ffa726"});
                    }
                } else if(rs_imc >= 29.1 && rs_imc <= 38.0 ){
                    x = 228/9;
                    $(".indicator").css({"border-top-color" : "#ef6c00"});
                    
                    if(isMobile) { 
                        $("#calculator-line-graph").css({"left": (left-(3*228))+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#ef6c00"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+(3*228)+x)+"px", "background-color" : "#ef6c00"});
                    }
                } else if(rs_imc > 38.0 ){
                    x = 228/2;
                    $(".indicator").css({"border-top-color" : "#c62828"});
                    
                    if(isMobile) { 
                        $("#calculator-line-graph").css({"left": (left-(4*228))+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#c62828"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+(4*228)+x)+"px", "background-color" : "#c62828"});
                    }
                }
            } else {
                if(rs_imc >= 0 && rs_imc <= 18.0 ){
                    x = 228/18;
                    $(".indicator").css({"border-top-color" : "#ffc107"});
                    if(isMobile) {
                        $("#calculator-line-graph").css({"left": left+"px"});
                    }
                    $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#ffc107"});
                } else if(rs_imc >= 18.1 && rs_imc <= 23.0 ){
                    x = 228/5;
                    $(".indicator").css({"border-top-color" : "#8bc34a"});
                    
                    if(isMobile) {
                        $("#calculator-line-graph").css({"left": (left-228)+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#8bc34a"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+228+x)+"px", "background-color" : "#8bc34a"});
                    }
                } else if(rs_imc >= 23.1 && rs_imc <= 28.0 ){
                    x = 228/5;
                    $(".indicator").css({"border-top-color" : "#ffa726"});
                    
                    if(isMobile) {
                        $("#calculator-line-graph").css({"left": (left-(2*228))+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#8bc34a"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+(2*228)+x)+"px", "background-color" : "#ffa726"});
                    }
                } else if(rs_imc >= 28.1 && rs_imc <= 37.0 ){
                    x = 228/9;
                    $(".indicator").css({"border-top-color" : "#ef6c00"});
                    
                    if(isMobile) { 
                        $("#calculator-line-graph").css({"left": (left-(3*228))+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#ef6c00"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+(3*228)+x)+"px", "background-color" : "#ef6c00"});
                    }
                } else if(rs_imc > 37.0 ){
                    x = 228/2;
                    $(".indicator").css({"border-top-color" : "#c62828"});
                    
                    if(isMobile) { 
                        $("#calculator-line-graph").css({"left": (left-(4*228))+"px"});
                        $(".calculator-line-graph-result-popup").css({"left": (left+x)+"px", "background-color" : "#c62828"});
                    } else {
                        $(".calculator-line-graph-result-popup").css({"left": (left+(4*228)+x)+"px", "background-color" : "#c62828"});
                    }
                }
            }
            $("#rs_sec_2").show();
            $('html, body').animate({
                scrollTop: $("#rs_sec_2").offset().top
            }, 1000);

        } else {
            $(".yz-alert-danger").show();
            $("#rs_sec_2").hide();
        }
    });

    function getInputs(){
        clr_age = $("#calculator-step-age").val();

        if(clr_h_unit == "cm"){
            clr_height = $("#calculator-step-height-cm").val();
        } else {
            let ft = $("#calculator-step-height-feet").val();
            let inc = $("#calculator-step-height-inch").val();

            clr_height = (Number(ft) * 30.48) + (Number(inc) * 2.54);
        }

        if(clr_w_unit == "kg"){
            clr_weight = $("#calculator-step-weight-input-kg").val();
        } else {
            let lbs = $("#calculator-step-weight-input-lbs").val();

            clr_weight = Number(lbs) * 0.453592;
        }
    }

    function validateForm(num){
        let total = 4;
        let i = 0;
        if(!clr_gender){
            $("#calculator-step-1").addClass("is-invalid");
        } else {
            i++;
            $("#calculator-step-1").removeClass("is-invalid");
        }

        if(!clr_age){
            $("#calculator-step-2").addClass("is-invalid");
        } else {
            i++;
            $("#calculator-step-2").removeClass("is-invalid");
        }

        if(!clr_height){
            $("#calculator-step-3").addClass("is-invalid");
        } else {
            i++;
            $("#calculator-step-3").removeClass("is-invalid");
        }

        if(!clr_weight){
            $("#calculator-step-4").addClass("is-invalid");
        } else {
            i++;
            $("#calculator-step-4").removeClass("is-invalid");
        }

        if(num == 1){
            total = 5;
            if(!clr_activity){
                $("#calculator-step-5").addClass("is-invalid");
            } else {
                i++;
                $("#calculator-step-5").removeClass("is-invalid");
            }
        }

        return i == total;
    }
});