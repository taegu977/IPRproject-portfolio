function apibtn() {
  const title = document.querySelector('input[name="p_title"]').value;
  LoadingWithMask();

  if (!title) {
    alert("발명제목을 입력해주세요.");
    closeLoadingWithMask(); // 입력이 없을 때도 마스크 해제 필요
    return;
  }

  fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ title: title })
  })
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const generatedText = doc.querySelector("textarea[name='p_content']").textContent;

      document.querySelector("textarea[name='p_content']").value = generatedText;
    })
    .catch(error => {
      console.error("Error:", error);
      alert("명세서 생성에 실패했습니다.");
    })
    .finally(() => {
      closeLoadingWithMask();
    });
}


// Enter 키로 할 일 추가
	function inkey(event) {
	    if(event.key == 'Enter') {
			event.preventDefault();
			apibtn();
		}
	}

	function LoadingWithMask() {
		var maskHeight = $(document).height();    var maskWidth  = window.document.body.clientWidth;
		var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";    
		var loadingImg = '';
		loadingImg += " <img src='/image/downloadimg.gif' style='position: relative; display: block; left: 860px; top: 300px; width: 200px;'/>";
		$('body').append(mask)
		$('#mask').css({'width' : maskWidth, 'height': maskHeight, 'opacity' : '0.3'}); 
		$('#mask').show();
		$('#mask').append(loadingImg);
		$('#mask').show();
	}

	function closeLoadingWithMask() {    
		$('#mask, #loadingImg').hide();    
		$('#mask, #loadingImg').empty();  
	}
