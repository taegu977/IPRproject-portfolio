function search(no) {
	const servicekey = "Yq3hDM/tz3XyZwpaUiq/cL6U5FXZOnajZQbvF4tyfl4=";
	const year = 0;
	const keyword = $("#search").val();
	// 수동으로켜야됨 'https://cors-anywhere.herokuapp.com/'
	const url = 'https://cors-anywhere.herokuapp.com/' + 'http://plus.kipris.or.kr/kipo-api/kipi/patUtiModInfoSearchSevice/getWordSearch'
	LoadingWithMask();
		$.ajax(
				{
					type:"get",
					async:true,
					url:url,
					data:{"word":keyword, "year":year, "ServiceKey":servicekey,"numOfRows":5, "pageNo":no},
					dataType: "xml",  // 응답 타입을 'xml'로 설정
					success:function(data, textStatus) {
						//alert("검색되었습니다!");
						// XML 데이터가 있는지 확인하기 위해 콘솔에 출력
				        console.log(data);  // 응답의 구조를 확인해보세요
						/* var responsData = JSON.parse(data); */
	//					let parser = new DOMParser();
	//					let xmlDoc = parser.parseFromString(data, "application/xml");
						// XML 데이터를 JSON으로 변환
						let jsonResponse = xmlToJson(data.documentElement);
	//					$("#output").html("<pre>" + JSON.stringify(jsonResponse, null, 2) + "</pre>");
						console.log(jsonResponse);
						console.log(jsonResponse.body);
						console.log(jsonResponse.body.items.item);								
						displayItemsAsHTML(jsonResponse.body.items.item); // item을 HTML로 출력
						pagingHtml(jsonResponse);
						
	//					alert(data);
	//					var html = data;
	//					$("#output").html(html);
					},
					error:function(data, textStatus) {
						alert("데이터 전송 실패!");
					},
					complete:function(data, textStatus) {
						closeLoadingWithMask();
					}
				}
			);


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



function pagingHtml(data){
	console.log("data",data);
	console.log("data.totalCount",data.totalCount);
	console.log("data.pageNo",data.pageNo);
	
	var pageSize = 10;
	var totalCount = data.totalCount['#text'];
	console.log("totalCount",totalCount);
	console.log("totalCount",totalCount['#text']);
	
	//let existPrevPage = startPage != 1;
	//let existNextPage = endPage != numOfRows;
	
	var totPageCnt = ((totalCount - 1) / pageSize) + 1;
	console.log("totPageCnt",totPageCnt);
	var html = "";
		html += "<ul>"
	for(var i = 1; totPageCnt >= i; i++){
		html += '<li><a href="#" onclick="search(' + i + ');">' + i + '</a></li>';
	}
	
	html += "</ul>"
	
	return html;
}


//json 데이터 페이징 처리
function pagingHtml(data) {
	var pageSize = 10;
	var recordSize = data.count.numOfRows['#text'];
	var page = parseInt(data.count.pageNo['#text']);
	var totalCount = parseInt(data.count.totalCount['#text']);
	var totPageCnt = Math.ceil((totalCount - 1) / recordSize) + 1;
	var startPage =  Math.floor((page - 1) / pageSize) * pageSize + 1;
	var endPage = startPage + pageSize - 1;
	if(endPage > totPageCnt) endPage = totPageCnt;
	var existPrevPage = startPage != 1;
	var existNextPage = endPage != totPageCnt;
	
	var pageHtml = '';
	
	if(existPrevPage){ //현제 페이지가 10(보이는 페이지 개수)보다 클때
		pageHtml += '<span class="pgmove_prev" onclick="search(' + (startPage - 1) +')"><span class="material-symbols-rounded">Chevron_Left</span></span>';
	}
	
	for(var i=startPage; endPage >= i; i++){
		if(page == i) pageHtml += '<span class="pgbtn_active" onclick="search(' + i + ')">' + i + '</span>';
		else pageHtml += '<span class="pg_btn" onclick="search(' + i + ')">' + i + '</span>';
	}
		
	if(existNextPage){ //현제 페이지가 10(보이는 페이지 개수)보다 작을때 
		pageHtml += '<span class="pgmove_next" onclick="search(' + (endPage + 1) +')"><span class="material-symbols-rounded">Chevron_right</span></span>';
	}
	
	$("#paging").html(pageHtml);
}


//XML을 JSON으로 변환하는 함수
function xmlToJson(xml) {
  // XML 문서가 단일 노드일 때, 텍스트로 반환
  let obj = {};

  if (xml.nodeType === 1) { // Element node
    // 요소 이름을 obj의 키로 추가
    if (xml.attributes.length > 0) {
      for (let i = 0; i < xml.attributes.length; i++) {
        obj[xml.attributes[i].nodeName] = xml.attributes[i].nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // Text node
    obj = xml.nodeValue;
  }

  // 자식 요소가 있으면, 자식 요소를 재귀적으로 처리
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
    	let item = xml.childNodes[i];
    	let nodeName = item.nodeName;

      // 자식 요소가 여러 개일 경우, 배열로 처리
      if (typeof obj[nodeName] === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (Array.isArray(obj[nodeName])) {
          obj[nodeName].push(xmlToJson(item));
        } else {
          obj[nodeName] = [obj[nodeName], xmlToJson(item)];
        }
      }
    }
  }

  return obj;
}
function displayItemsAsHTML(items) {
  let outputHTML = "";
  
  // #output div를 보여주기 위해 display: block 처리
  const outputDiv = document.getElementById('output');
  outputDiv.style.display = "none"; // 초기에는 숨김

  if (Array.isArray(items) && items.length > 0) {
    outputHTML += "<table class='search-itembox'><tr class='search-ibox01'><th class='search-ititle'>발명 제목</th><th class='search-ino01'>출원 번호</th></tr>";
    items.forEach(item => {
      outputHTML += "<tr class='search-ibox02'>";
      // 클릭 시 openPopup(item) 호출, item 객체를 직접 전달
      outputHTML += `<td class='search-iclick'><p class='search-p' onclick="popup(${item.applicationNumber['#text']})">${item.inventionTitle['#text']}</p></td>`;
      outputHTML += `<td class='search-ino02'>${item.applicationNumber['#text']}</td>`;
      outputHTML += "</tr>";
    });
    outputHTML += "</table>";
  } else if (items && items.inventionTitle) {
    // 단일 아이템이 있을 경우 처리
    let item = items;
    outputHTML += "<div class='item'>";
    outputHTML += `<h3>발명 제목: ${item.inventionTitle['#text']}</h3>`;
    outputHTML += `<p>출원 번호: ${item.applicationNumber['#text']}</p>`;
    outputHTML += `<p>출원일: ${item.applicationDate['#text']}</p>`;
    outputHTML += `<p>등록 번호: ${item.registerNumber['#text']}</p>`;
    outputHTML += `<p>등록 상태: ${item.registerStatus['#text']}</p>`;
    outputHTML += `<p>출원인: ${item.applicantName['#text']}</p>`;
    outputHTML += `<p>IPC 번호: ${item.ipcNumber['#text']}</p>`;
    outputHTML += `<p>등록일: ${item.registerDate['#text']}</p>`;
    outputHTML += `<p>공개일: ${item.publicationDate['#text']}</p>`;
    outputHTML += "</div>";
  } else {
    outputHTML = "<p>검색 결과가 없습니다.</p>";
  }

  // 검색 결과가 있으면 #output div 보이게 하기
  if (outputHTML) {
    outputDiv.style.display = "block"; // 검색 결과가 있으면 보여줌
  }

  // #output div에 HTML 내용 추가
  outputDiv.innerHTML = outputHTML;
}

function popup(applicationNumber) {
	const servicekey = "Yq3hDM/tz3XyZwpaUiq/cL6U5FXZOnajZQbvF4tyfl4=";
	// 수동으로켜야됨 'https://cors-anywhere.herokuapp.com/'
	const url = 'https://cors-anywhere.herokuapp.com/' + 'http://plus.kipris.or.kr/openapi/rest/patUtiModInfoSearchSevice/applicationNumberSearchInfo'
	LoadingWithMask1();
	$.ajax(
			{
				type:"get",
				async:true,
				url:url,
				data:{"applicationNumber":applicationNumber, "docStart":'1', "accessKey":servicekey},
				dataType: "xml",  // 응답 타입을 'xml'로 설정
				success:function(data, textStatus) {
					// XML 데이터가 있는지 확인하기 위해 콘솔에 출력
			        console.log(data);  // 응답의 구조를 확인해보세요
					/* var responsData = JSON.parse(data); */
//					let parser = new DOMParser();
//					let xmlDoc = parser.parseFromString(data, "application/xml");
					// XML 데이터를 JSON으로 변환
					let jsonResponse = xmlToJson(data.documentElement);
//					$("#output").html("<pre>" + JSON.stringify(jsonResponse, null, 2) + "</pre>");
					console.log(jsonResponse);
					console.log(jsonResponse.body);
					console.log(jsonResponse.body.items);
					console.log(jsonResponse.body.items.PatentUtilityInfo);
					console.log(jsonResponse.body.items.PatentUtilityInfo.InventionName['#text']);
					item = jsonResponse.body.items.PatentUtilityInfo;
					
					let outputHTML = "";
					outputHTML += "<div class='detail-container'>";
					outputHTML += "<div class='detail-box'>";
					outputHTML += "<div class='detail'>";
					outputHTML += `<h3 class="invention-title">발명 제목: ${item.InventionName['#text'] || ''}</h3>`;
					outputHTML += `<p><strong>출원 번호:</strong> ${item.ApplicationNumber['#text'] || ''}</p>`;
					outputHTML += `<p><strong>출원일:</strong> ${item.ApplicationDate['#text'] || ''}</p>`;
					outputHTML += `<p>등록 번호: ${item.RegistrationNumber['#text'] || ''}</p>`;
					outputHTML += `<p>등록 상태: ${item.RegistrationStatus['#text'] || ''}</p>`;
					outputHTML += `<p>출원인: ${item.Applicant['#text'] || ''}</p>`;
					outputHTML += `<p>IPC 번호: ${item.InternationalpatentclassificationNumber['#text'] || ''}</p>`;
					outputHTML += `<p>등록일: ${item.RegistrationDate['#text'] || ''}</p>`;
					outputHTML += `<p>공개일: ${item.OpeningDate['#text'] || ''}</p>`;
					outputHTML += "</div>";
					outputHTML += "</div>";
					outputHTML += "<div class='detail-img'>";
					outputHTML += `<p><img class="pop-img" src="${item.DrawingPath['#text']  || ''}"></p>`;
					outputHTML += "</div>";
					outputHTML += "</div>";
					
					//displayItemsAsHTML(jsonResponse.body.items); // item을 HTML로 출력

//					alert(data);
//					var html = data;
 // 팝업에 내용 삽입
            $("#popup-details").html(outputHTML);
            $("#popup").fadeIn();  // 팝업을 화면에 표시

            // 닫기 버튼 클릭 시 팝업 닫기
            $("#close-popup").click(function () {
                $("#popup").fadeOut();  // 팝업을 숨김
            });
        },
        error: function (data, textStatus) {
            alert("데이터 전송 실패!");
			},
		complete:function(data, textStatus) {
				closeLoadingWithMask1();
			}
		}
	);
}

function LoadingWithMask1() {
	var maskHeight = $(document).height();    var maskWidth  = window.document.body.clientWidth;
	var mask = "<div id='mask' style='position:absolute; z-index:9000; background-color:#000000; display:none; left:0; top:0;'></div>";    
	var loadingImg = '';
	loadingImg += " <img src='/image/loading.gif' style='position: relative; display: block; left: 860px; top: 300px; width: 200px;'/>";
	$('body').append(mask)
	$('#mask').css({'width' : maskWidth, 'height': maskHeight, 'opacity' : '0.3'}); 
	$('#mask').show();
	$('#mask').append(loadingImg);
	$('#mask').show();
}

function closeLoadingWithMask1() {    
	$('#mask, #loadingImg').hide();    
	$('#mask, #loadingImg').empty();  
}


function inkey(event) {
    if(event.key == 'Enter') {
		event.preventDefault();
		search(1);
	}
}