function ckJfrm() {
		var frm = document.frmJoinLeader;
		
		if(frm.member_id.value == "") {
			alert("아이디를 입력해주세요.");
			frm.member_id.focus();
			return;
		}
		
		if(frm.name.value == "") {
			alert("이름을 입력해주세요.");
			frm.name.focus();
			return;
		}	
		
		if(frm.position_id.value == "") {
			alert("직급을 입력해주세요.");
			frm.position_id.focus();
			return;
		}
			
		frm.submit();
		
	}