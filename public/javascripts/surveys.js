var tag1 = '<div class="input-group">질문 제목<input type="text" class="form-control input_text"></div><br/>';
tag1 = tag1 + '<div class="row"><div class="col-lg-6" id="multi"><div class="input-group input_radio"><span class="input-group-addon"><input type="radio"></span><input type="text" class="form-control"></div><!-- /input-group --></div><!-- /.col-lg-6 --></div><br/><button class="btn btn-default" type="button" onClick=plus()>답변추가</button><hr/>';

var plus_tag1 = '<div class="input-group input_radio"><span class="input-group-addon"><input type="radio"></span><input type="text" class="form-control"></div>';

var tag2 = '<div class="input-group">질문 제목<input type="text" class="form-control input_text"></div><br/>';
tag2 = tag2 + '<div class="input-group">답변<input type="text" class="form-control input_text"></div><hr/>';

var tag3 = '<div class="input-group">질문 제목<input type="text" class="form-control input_text"></div><br/>';
tag3 =  tag3 + '<div><textarea class="form-control input_text" rows="3">답변</textarea></div><hr/>';

$("#button_multiple").click(function() {
	$("#mainform").append(tag1);
});

$("#button_text").click(function() {
	$("#mainform").append(tag2);
});

$("#button_longtext").click(function() {
	$("#mainform").append(tag3);
});

function plus(){
  	$("#multi").append(plus_tag1);
}
