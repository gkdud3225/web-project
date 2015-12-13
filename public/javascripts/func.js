
function isMulti(){
  if($("#category").val() === "객관식"){
    $("#multi").css('display', 'inline-block');
  }
}

function check(id,answer){
  alert("#"+id);
  alert(answer);
  $("#"+id).val(answer);
  $("#"+id).css('display', 'none');
  document.getElementById(id).value=answer;
}

function answers(){
  if($("#multi").val() === "1"){
    $("#answer1").css('display', 'inline-block');
    $("#answer2").css('display', 'none');
    $("#answer3").css('display', 'none');
    $("#answer4").css('display', 'none');
    $("#answer5").css('display', 'none');
  }else if($("#multi").val() === "2"){
    $("#answer1").css('display', 'inline-block');
    $("#answer2").css('display', 'inline-block');
    $("#answer3").css('display', 'none');
    $("#answer4").css('display', 'none');
    $("#answer5").css('display', 'none');
  }else if($("#multi").val() === "3"){
    $("#answer1").css('display', 'inline-block');
    $("#answer2").css('display', 'inline-block');
    $("#answer3").css('display', 'inline-block');
    $("#answer4").css('display', 'none');
    $("#answer5").css('display', 'none');
  }else if($("#multi").val() === "4"){
    $("#answer1").css('display', 'inline-block');
    $("#answer2").css('display', 'inline-block');
    $("#answer3").css('display', 'inline-block');
    $("#answer4").css('display', 'inline-block');
    $("#answer5").css('display', 'none');
  }else if($("#multi").val() === "5"){
    $("#answer1").css('display', 'inline-block');
    $("#answer2").css('display', 'inline-block');
    $("#answer3").css('display', 'inline-block');
    $("#answer4").css('display', 'inline-block');
    $("#answer5").css('display', 'inline-block');
  }
}
