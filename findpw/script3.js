function editUser() {
		document.frmInfo.action = 'editUser';
		document.frmInfo.method = 'post';
		document.frmInfo.submit();
	}
	function deleteUser() {
		document.frmInfo.action = 'deleteUser';
		document.frmInfo.method = 'post';
		document.frmInfo.submit();
	}
	
	function resetpw() {
		let newpw = document.frmresetpw.newpassword.value;
		let chkpw = document.frmresetpw.password.value;
		
		if(newpw == chkpw) {
			alert("비밀번호를 변경하였습니다.");
			document.frmresetpw.submit();
		}
		else {
			alert("비밀번호가 일치하지 않습니다.")
			document.frmresetpw.reset();
			document.frmresetpw.newpassword.focus();
		}
	}
	
	function searchckk() {
	    const frm = document.forms["indexFrm"]; // <-- 따옴표 수정

	    if (frm.keyword.value.trim() === "") {
	        window.alert("검색어를 입력주세요!");
	        frm.keyword.focus();
	        return;
	    }

	    frm.submit();
	}
	
	function searchmt() {
		    const frm = document.forms["indexFrm"]; // <-- 따옴표 수정

		    if (frm.keyword.value.trim() === "") {
		        window.alert("검색어를 입력주세요!");
		        frm.keyword.focus();
		        return;
		    }

		    frm.submit();
	}
		
	function viewIndex() {
		indexFrm.submit();
	}
	
	function viewPtmain() {
		ptmainFrm.submit();
	}

	function LoadingWithMask() {
		var maskHeight = $(document).height();
		var maskWidth = window.document.body.clientWidth;
		var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";
		var loadingImg = '';
		loadingImg += " <img src='/image/downloadimg.gif' style='position: relative; display: block; left: 860px; top: 300px; width: 200px;'/>";
		$('body').append(mask)
		$('#mask').css({'width': maskWidth, 'height': maskHeight, 'opacity': '0.3'});
		$('#mask').show();
		$('#mask').append(loadingImg);
		$('#mask').show();
	}

	function closeLoadingWithMask() {
		$('#mask, #loadingImg').hide();
		$('#mask, #loadingImg').empty();
	}

	function sendTempPassword() {
		var member_id = document.getElementById("member_id").value.trim();
		var email = document.getElementById("email").value.trim();
		
		if (!member_id) {
			alert("아이디를 입력해주세요.");
			document.getElementById("member_id").focus();
			return;
		}
		
		if (!email) {
			alert("이메일을 입력해주세요.");
			document.getElementById("email").focus();
			return;
		}
		
		// 이메일 형식 검증
		var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			alert("올바른 이메일 형식이 아닙니다.");
			document.getElementById("email").focus();
			return;
		}
		
		// 로딩 마스크 표시
		LoadingWithMask();
		
		$.ajax({
			type: "POST",
			url: "/sendTempPassword",
			data: {
				member_id: member_id,
				email: email
			},
			success: function(response) {
				closeLoadingWithMask();
				if (response.success) {
					alert(response.message);
					window.location.href = "/login";
				} else {
					alert(response.message);
					if (response.focusField) {
						document.getElementById(response.focusField).focus();
					}
				}
			},
			error: function(xhr, status, error) {
				closeLoadingWithMask();
				try {
					var response = JSON.parse(xhr.responseText);
					alert(response.message || "오류가 발생했습니다.");
					if (response.focusField) {
						document.getElementById(response.focusField).focus();
					}
				} catch (e) {
					alert("오류가 발생했습니다.");
				}
			}
		});
	}
	

	// 달력
    function renderCalendar(targetDate) {
        const year = targetDate.getFullYear();
        const month = targetDate.getMonth();
        const today = new Date();
        const isThisMonth = (year === today.getFullYear() && month === today.getMonth());

        document.querySelector('.calendar-month').textContent = (month + 1) + '월';
        document.querySelector('.calendar-year').textContent = year;

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 기본 달력 HTML 생성
        let html = '';
        for (let i = 0; i < firstDay; i++) html += '<span></span>';
        for (let d = 1; d <= lastDate; d++) {
            const dateStr = `${year}-${month+1}-${d}`;
            if (isThisMonth && d === today.getDate()) {
                html += `<span class="today" data-date="${dateStr}">${d}</span>`;
            } else {
                html += `<span data-date="${dateStr}">${d}</span>`;
            }
        }
        document.querySelector('.calendar-dates').innerHTML = html;

        // 날짜 클릭 이벤트 추가
        document.querySelectorAll('.calendar-dates span[data-date]').forEach(function(el) {
            el.addEventListener('click', function() {
                const dateStr = this.getAttribute('data-date');
                showDatePopup(dateStr);
            });
        });

        // 해당 월의 메모 데이터 가져오기
        fetch(`/${year}/${month + 1}`)
            .then(response => response.json())
            .catch(error => {
                console.error('메모 데이터를 가져오는 중 오류 발생:', error);
            });
    }

    // 팝업창 표시 함수
    function showDatePopup(dateStr) {
        const popup = document.getElementById('date-popup');
        const popupContent = popup.querySelector('.date-popup-content');
        const title = popup.querySelector('.date-popup-title');
        const [year, month, day] = dateStr.split('-');
        title.textContent = `${year}년 ${month}월 ${day}일`;
		
        document.getElementById('memo_date').value = dateStr;
        
        // 팝업창 위치 초기화
        popupContent.style.transform = 'translate3d(0px, 0px, 0)';
        popup.style.display = 'block';

        // 해당 날짜의 메모 내용 가져오기
        fetch(`/${dateStr}`)
            .then(response => response.json())
            .then(data => {
                document.querySelector('textarea[name="content"]').value = data.content || '';
            });

        // 드래그 기능 초기화
        initDragPopup();
    }

    // 팝업창 드래그 기능
    function initDragPopup() {
        const popup = document.querySelector('.date-popup-content');
        const dragArea = document.querySelector('.date-popup-drag-area');
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        dragArea.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === dragArea) {
                isDragging = true;
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, popup);
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        }
    }

    // 최초 렌더링
    let currentDate = new Date();
    window.addEventListener('DOMContentLoaded', function() {
        renderCalendar(currentDate);

        document.querySelector('.calendar-today-btn').addEventListener('click', function() {
            currentDate = new Date();
            renderCalendar(currentDate);
        });

        document.querySelector('.calendar-prev-btn').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });

        document.querySelector('.calendar-next-btn').addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });

        // 팝업창 닫기 버튼 이벤트
        document.querySelector('.date-popup-close').addEventListener('click', function() {
            const popup = document.getElementById('date-popup');
            const popupContent = popup.querySelector('.date-popup-content');
            // 팝업창 위치 초기화
            popupContent.style.transform = 'translate3d(0px, 0px, 0)';
            popup.style.display = 'none';
        });
    });
	
	function submitReply() {
	    var content = document.querySelector('textarea[name="content"]').value;
	    if (content.trim() === '') {
	        alert('내용을 입력해주세요');
	        return;
	    }
	    var formData = new FormData(document.getElementById('memoFrm'));
	    fetch('/memo', {
	        method: 'POST',
	        body: formData
	    })
	    .then(response => {
	        if (response.ok) {
	            alert('저장되었습니다.');
	            // 달력 다시 렌더링하여 체크 표시 업데이트
	            renderCalendar(currentDate);
	            // 팝업창을 닫지 않고 다시 표시
	            var popup = document.getElementById('date-popup');
	            popup.style.display = 'block';
	        } else {
	            alert('저장에 실패했습니다.');
	        }
	    })
	    .catch(error => {
	        console.error('Error:', error);
	        alert('오류가 발생했습니다.');
	    });
	}
