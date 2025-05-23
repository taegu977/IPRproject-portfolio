function editMember(n) {
		let id_name = "#line" + n;
		let id = $(id_name +"> .id > a").text();
		let pw = $(id_name +"> .pw").text();
		let name = $(id_name +"> .name").text();
		let addr = $(id_name +"> .addr").text();
		let telno = $(id_name +"> .telno").text();
		let email = $(id_name +"> .email").text();
		$(id_name +" > .pw").html("<input type='password' name='pw' value='"+pw+"'>");
		$(id_name +" > .name").html("<input type='text' name='name' value='"+name+"'>");
		$(id_name +" > .addr").html("<input type='text' name='addr' value='"+addr+"'>");
		$(id_name +" > .telno").html("<input type='text' name='telno' value='"+telno+"'>");
		$(id_name +" > .email").html("<input type='text' name='email' value='"+email+"'>");
		$(id_name +" > .edit").html("<p onclick='saveMember("+n+")'>[저장]</p>");
	}
	function saveMember(n) {
		let id_name = "#line" + n;
		let frm = document.createElement("form");
		frm.action = "edit";
		frm.method = "post";
		document.body.appendChild(frm);
		
		let id = document.createElement("input");
		id.name = "member_id";
		id.type = "hidden";
		id.value = $(id_name +" > .id > a").text();
		frm.appendChild(id);

		/*let pw = document.createElement("input");
		pw.name = "password";
		pw.type = "hidden";
		pw.value = $(id_name +"> .pw > input").val();
		frm.appendChild(pw);*/
		
		let name = document.createElement("input");
		name.name = "name";
		name.type = "hidden";
		name.value = $(id_name +"> .name > input").val();
		frm.appendChild(name);
		
		let addr = document.createElement("input");
		addr.name = "address";
		addr.type = "hidden";
		addr.value = $(id_name +"> .addr > input").val();
		frm.appendChild(addr);
		
		let telno = document.createElement("input");
		telno.name = "telno";
		telno.type = "hidden";
		telno.value = $(id_name +"> .telno > input").val();
		frm.appendChild(telno);
		
		let email = document.createElement("input");
		email.name = "email";
		email.type = "hidden";
		email.value = $(id_name +"> .email > input").val();
		frm.appendChild(email);
		
		frm.submit();
	}