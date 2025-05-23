		// 할 일 추가
		function addTask() {
			let frm = document.forms["addTaskForm"];
		    let task = frm.task.value.trim();
			
		    if(task === "") {
		        window.alert("내용을 입력해 주세요.");
		        frm.task.focus();
		        return;
		    }
			frm.submit();
		}
		
		// Enter 키로 할 일 추가
		function inkey(event) {
		    if(event.key == 'Enter') {
				event.preventDefault();
				addTask();
			}
		}

    // 할 일 수정
		function editTask(id) {
			// p 태그를 input 태그로 변경
			const id_name = "#task_no_" + id;
			const p_element = document.querySelector(id_name + " > p");
			const input_element = document.createElement("input");
			let task = p_element.innerText;
			input_element.type = "text";
			input_element.value = task;
			p_element.replaceWith(input_element);

			// button 속성 변경
			const btn_element = document.querySelector("#edit_button_" + id);
			btn_element.value = "저장";
			btn_element.onclick = function() {saveTask(id); };
		}

		function saveTask(id) {
			let task = document.querySelector("#task_no_" + id + " > input").value;
			let project_id = addTaskForm.project_id.value;
			location.href = "editTask?id=" + id + "&task=" + task + "&project_id=" + project_id;
		}
		
		function changeStatus(el) {
			const status_list = {"start":"progress","progress":"stop","stop":"complete","complete":"start"};
			const id_element = el.nextElementSibling;
			const status_element = id_element.nextElementSibling;
			const id = id_element.value;
			const status = status_element.value;
			let project_id = addTaskForm.project_id.value;
			location.href = "changeStatus?id=" + id + "&status=" + status_list[status] + "&project_id=" + project_id;;
		}
	
		
		function viewRecCnt() {
			searchFrm.submit();
		}
		

		function addFile(button) {
			const parent = button.parentElement;
			var addElement = document.createElement('div');
			addElement.innerHTML = '<input type="file" name="file">'
									+ '<input type="button" value="X" onclick="delFile(this)">';
			parent.appendChild(addElement);
		}

		function delFile(button) {
			button.parentElement.remove();
		}
		// 발명등록 알림창
		function aprovebutton() {
		     const frm = document.writeProjectFrm;
		     
		     // 프로젝트 ID 검증
		     if (frm.project_id.value == "") {
		       window.alert("출원관리번호를 입력해주세요!");
		       frm.project_id.focus();
		       return;
		     }
		
		     // 발명자 검증
		     if (frm.pt_name.value == "") {
		       window.alert("발명자를 입력해주세요!");
		       frm.pt_name.focus();
		       return;
		     }
		
		     // 발명 제목 검증
		     if (frm.p_title.value == "") {
		       window.alert("발명제목을 입력해주세요!");
		       frm.p_title.focus();
		       return;
		     }
		
		     // 발명 내용 검증
		     if (frm.p_content.value == "") {
		       window.alert("발명내용을 입력해주세요!");
		       frm.p_content.focus();
		       return;
		     }
		
		     // 팀장 선택 검증
		     if (frm.team_leader.value == "") {
		       window.alert("팀장을 선택해주세요!");
		       frm.team_leader.focus();
		       return;
		     }
		
		     // 출원날짜 검증
		     if (frm.create_date.value == "") {
		       window.alert("출원날짜를 입력해주세요!");
		       frm.create_date.focus();
		       return;
		     }
		
		     // 모든 필드를 통과하면 승인요청 버튼을 자동으로 클릭
		     window.alert("발명등록이 되었습니다!");
		
		     // 버튼 클릭을 시뮬레이션하여 폼 제출
		    document.writeProjectFrm.submit();
		   }
		   
		 
		   function ptsavebtn() {
		        const frm = document.editptstatus;
				
				if (frm.project_status_ss.value == "") {
			       window.alert("현재상황을 선택해주세요!");
			       frm.project_status_ss.focus();
			       return;
			     }
				
				var pt=frm.project_status_ss.value;
				var ptname=pt.split(','); 
				 frm.project_status.value=ptname[0];
				 frm.ptapproval.value=ptname[1];
				

		        // 모든 필드를 통과하면 승인요청 버튼을 자동으로 클릭
		        window.alert("완료 되었습니다!");

		        // 버튼 클릭을 시뮬레이션하여 폼 제출
		       document.editptstatus.submit();
		      }
		   		   
		   // 발명등록 알림창
	   		function returnbut() {
	   		     const frm = document.editProject;
	   		     
			
				 // 프로젝트 ID 검증
 	   		     if (frm.project_status_select.value == "") {
 	   		       window.alert("상태를 선택해주세요!");
 	   		       frm.project_status.focus();
 	   		       return;
 	   		     }
	   			   		
	   		
	   		     // 팀장 선택 검증
	   		     if (frm.team_leader.value == "") {
	   		       window.alert("팀장을 선택해주세요!");
	   		       frm.team_leader.focus();
	   		       return;
	   		     }
				 
				 var pt=frm.project_status_select.value;
				 var ptname=pt.split(',');
				
				 
				 frm.project_status.value=ptname[0];
				 frm.ptapproval.value=ptname[1];
				
	   		
	   		
	   		     // 모든 필드를 통과하면 승인요청 버튼을 자동으로 클릭
	   		     window.alert("수정이 완료되었습니다!");
				 
				 
	   		
	   		     // 버튼 클릭을 시뮬레이션하여 폼 제출
	   		    document.editProject.submit();
	   		   }
			   
			   function returnptbut() {
	   		     const frm = document.editProject;
	   		     
				 var pt=frm.project_status_ss.value;
				 var ptname=pt.split(',');
				
				 if (frm.p_ptnumber.value == "") {
	  	   		       window.alert("출원 번호를 입력주세요!");
	  	   		       frm.p_ptnumber.focus();
	  	   		       return;
	  	   		     }
				 
				 frm.project_status.value=ptname[0];
				 frm.ptapproval.value=ptname[1];
				
	   		     // 버튼 클릭을 시뮬레이션하여 폼 제출
	   		    frm.submit();
	   		   }

			   
			   // 현재 로그인한 사용자 정보 가져오기
			   function getCurrentUser() {
			       const userElement = document.getElementById('currentUserName');
			       return userElement ? userElement.value : 'anonymous';
			   }

			   // 현재 페이지가 index 페이지인지 확인
			   const isIndexPage = window.location.pathname === '/' || 
			                      window.location.pathname === '/index' || 
			                      window.location.pathname.startsWith('/index/');

			   // 알림 아이콘 표시/숨김 처리
			   document.addEventListener('DOMContentLoaded', function() {
			       const notificationIcon = document.querySelector('.notification-icon');
			       if (notificationIcon) {
			           // index 페이지가 아닐 경우 알림 아이콘 숨김
			           if (!isIndexPage) {
			               notificationIcon.style.display = 'none';
			           }
			       }
			   });

			   // 팝업 열기
			   function openPop() {
			       document.getElementById("notification_popup_layer").style.display = "block";
			   }

			   // 팝업 닫기
			   function closePop() {
			       document.getElementById("notification_popup_layer").style.display = "none";
			   }

			   // 페이지 로드 시 이벤트 리스너 등록
			   document.addEventListener('DOMContentLoaded', function() {
			       // 현재 로그인한 사용자 정보 가져오기
			       const currentUser = getCurrentUser();

			       // 알림 아이콘 클릭 이벤트
			       var notificationIcon = document.querySelector('.notification-icon');
			       if (notificationIcon) {
			           notificationIcon.onclick = function(e) {
			               e.preventDefault();
			               e.stopPropagation();
			               openPop();
			               updateNotificationStatus(currentUser); // 알림 상태 업데이트
			           };
			       }

			       // 닫기 버튼 클릭 이벤트
			       var closeBtn = document.querySelector('.notification_close_btn');
			       if (closeBtn) {
			           closeBtn.onclick = function(e) {
			               e.preventDefault();
			               e.stopPropagation();
			               closePop();
			           };
			       }

			       // 팝업 외부 클릭 시 닫기
			       var popupLayer = document.getElementById('notification_popup_layer');
			       if (popupLayer) {
			           popupLayer.onclick = function(e) {
			               if (e.target === this) {
			                   closePop();
			               }
			           };
			       }

			       // 특허 알림 읽음 처리
			       const patentTitles = document.querySelectorAll('.patent-title');
			       const alarmIcon = document.querySelector('.alarm-icon');
			       
			       // localStorage에서 사용자별 읽은 특허 목록 가져오기
			       const storageKey = `readPatents_${currentUser}`;
			       let readPatents = JSON.parse(localStorage.getItem(storageKey) || '{}');
			       
			       // 초기 알림 상태 업데이트
			       updateNotificationStatus(currentUser);

			       patentTitles.forEach(title => {
			           const projectId = title.getAttribute('data-project-id');
			           const row = title.closest('tr');
			           const readStatus = row.querySelector('.read-status');
			           
			           // 이미 읽은 특허는 스타일 적용
			           if (readPatents[projectId]) {
			               title.style.fontWeight = 'normal';
			               title.style.color = '#666';
			               readStatus.textContent = '읽음';
			               readStatus.style.color = '#666';
			           }

			           title.addEventListener('click', function(e) {
			               const projectId = this.getAttribute('data-project-id');
			               const row = this.closest('tr');
			               const readStatus = row.querySelector('.read-status');
			               
			               // 아직 읽지 않은 특허인 경우에만 카운트 감소
			               if (!readPatents[projectId] && alarmIcon) {
			                   const currentCount = parseInt(alarmIcon.textContent, 10);
			                   if (currentCount > 0) {
			                       alarmIcon.textContent = (currentCount - 1).toString();
			                   }
			                   
			                   // 읽음 상태 저장 (사용자별)
			                   readPatents[projectId] = true;
			                   localStorage.setItem(storageKey, JSON.stringify(readPatents));
			                   
			                   // 스타일 변경
			                   this.style.fontWeight = 'normal';
			                   this.style.color = '#666';
			                   readStatus.textContent = '읽음';
			                   readStatus.style.color = '#666';
			               }
			           });
			       });
			   });

			   // 알림 상태 업데이트 함수
			   function updateNotificationStatus(currentUser) {
			       const storageKey = `readPatents_${currentUser}`;
			       const readPatents = JSON.parse(localStorage.getItem(storageKey) || '{}');
			       const alarmIcon = document.querySelector('.alarm-icon');
			       const patentRows = document.querySelectorAll('tr[data-project-id]');
			       
			       let unreadCount = 0;
			       
			       patentRows.forEach(row => {
			           const projectId = row.getAttribute('data-project-id');
			           const title = row.querySelector('.patent-title');
			           const readStatus = row.querySelector('.read-status');
			           
			           if (!readPatents[projectId]) {
			               unreadCount++;
			               title.style.fontWeight = 'bold';
			               title.style.color = '#5dade2';
			               readStatus.textContent = '읽지 않음';
			               readStatus.style.color = '#000';
			           } else {
			               title.style.fontWeight = 'normal';
			               title.style.color = '#666';
			               readStatus.textContent = '읽음';
			               readStatus.style.color = '#666';
			           }
			       });
			       
			       if (alarmIcon) {
			           alarmIcon.textContent = unreadCount.toString();
			       }
			   }
