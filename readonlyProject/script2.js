function ptapproval(ptapproval) {
	var project_id = $("#project_id").val();
	if(ptapproval == "1"){
		if(!confirm("발명등록을 승인하시겠습니까?")) return;
	}else{
		if(!confirm("발명등록을 반려하시겠습니까?")) return;
	}
	
	location.href="/ptapproval?project_id=" + project_id + "&ptapproval=" + ptapproval;	
}

function reptapproval(ps,pt) {
	var project_id = $("#project_id").val();
	if(!confirm("발명등록을 재승인하시겠습니까?")) return;
	
	location.href="/reptapproval?project_id=" + project_id + "&ptapproval=" + pt + "&project_status=" + ps;	
}
function submitReply() {
    var comment = document.querySelector('textarea[name="comment"]').value;
    if (comment.trim() === '') {
        alert('내용을 입력해주세요');
        return;
    }
    document.getElementById('replyForm').submit();
}