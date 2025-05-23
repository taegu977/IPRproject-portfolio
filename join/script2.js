function checkPassword(password) {
	const passwordError = document.getElementById('password-error');
	let errorMessage = "";
	
	if (password.length > 0) {
		// 8자 이상
		if (password.length < 8) {
			errorMessage += "• 비밀번호는 8자 이상이어야 합니다.<br>";
		}
		
		// 대문자 포함
		if (!/[A-Z]/.test(password)) {
			errorMessage += "• 대문자를 포함해야 합니다.<br>";
		}
		
		// 소문자 포함
		if (!/[a-z]/.test(password)) {
			errorMessage += "• 소문자를 포함해야 합니다.<br>";
		}
		
		// 특수문자 포함
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
			errorMessage += "• 특수문자를 포함해야 합니다.<br>";
		}
		
		if (errorMessage !== "") {
			passwordError.innerHTML = "비밀번호는 다음 조건을 모두 만족해야 합니다:<br>" + errorMessage;
			passwordError.style.display = "block";
		} else {
			passwordError.style.display = "none";
		}
	} else {
		passwordError.style.display = "none";
	}
}

function validatePassword(password) {
	let errorMessage = "";
	
	// 8자 이상
	if (password.length < 8) {
		errorMessage += "• 비밀번호는 8자 이상이어야 합니다.<br>";
	}
	
	// 대문자 포함
	if (!/[A-Z]/.test(password)) {
		errorMessage += "• 대문자를 포함해야 합니다.<br>";
	}
	
	// 소문자 포함
	if (!/[a-z]/.test(password)) {
		errorMessage += "• 소문자를 포함해야 합니다.<br>";
	}
	
	// 특수문자 포함
	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		errorMessage += "• 특수문자를 포함해야 합니다.<br>";
	}
	
	return {
		isValid: errorMessage === "",
		message: errorMessage
	};
}

function ckfrm() {
	var frm = document.frmJoin;
	
	if(frm.member_id.value == "") {
		alert("아이디를 입력해주세요.");
		frm.member_id.focus();
		return;
	}
	
	// 아이디 중복 체크 여부 확인
	let msgText = document.getElementById('msg').innerText;
	if(msgText.includes("이미 사용 중인 아이디입니다")) {
		alert("사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요.");
		frm.member_id.value = "";
		frm.member_id.focus();
		return;
	}
	
	if(frm.password.value == "") {
		alert("패스워드를 입력해주세요.");
		frm.password.focus();
		return;
	}
	
	// 비밀번호 유효성 검사 추가
	const passwordValidation = validatePassword(frm.password.value);
	if (!passwordValidation.isValid) {
		const passwordError = document.getElementById('password-error');
		passwordError.innerHTML = "비밀번호는 다음 조건을 모두 만족해야 합니다:<br>" + passwordValidation.message;
		passwordError.style.display = "block";
		frm.password.focus();
		return;
	}
	
	if(frm.name.value == "") {
		alert("이름을 입력해주세요.");
		frm.name.focus();
		return;
	}
	
	if(frm.email.value == "") {
			alert("E-mail을 입력해주세요.");
			frm.email.focus();
			return;
		}
		
	if(frm.birthday.value == "") {
			alert("생년월일을 입력해주세요.");
			frm.birthday.focus();
			return;
		}
	
	if(frm.address.value == "") {
		alert("주소를 입력해주세요.");
		frm.address.focus();
		return;
	}
	
	if(frm.telno.value == "") {
		alert("전화번호를 입력해주세요.");
		frm.telno.focus();
		return;
			}		

	if(frm.gender.value == "") {
		alert("성별을 선택해주세요.");
		frm.gender.focus();
		return;
	}
		
	frm.submit();
	
}

function chkId() {
	let member_id = document.frmJoin.member_id.value;
	
	if(member_id == "") {
		alert("아이디를 입력해주세요.");
		document.frmJoin.member_id.focus();
		return;
	}
	
	$.ajax({
		type: "get",
		async: true,
		url: "/checkId",
		data: {"member_id": member_id},
		success: function(data, textStatus) {
			$("#msg").html(`<p class="chk-box">${data}</p>`);
			if(data.includes("이미 사용 중인 아이디입니다")) {
				document.frmJoin.member_id.value = "";
				document.frmJoin.member_id.focus();
			}
		},
		error: function(data, textStatus) {
			alert("데이터 전송 실패!");
		},
		complete: function(data, textStatus) {
		}
	});
}