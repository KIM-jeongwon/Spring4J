var createNav=x=>{
	return '<nav id="'+x.id+'" class="'+x.clazz+'"></nav>';
}
var createFont=x=>{
	return '<font>"'+x.val+'"</font>';
}
var pagenation=x=>{
	return '<ul class="pagination">'
	+'  <c:if test="${page.prevBlock}" >'
	+'    <li>'
	+'        <a href="#" onclick="app.boardList(${page.pageStart-1}); +return false;" aria-label="Previous">'
	+'          <span aria-hidden="true">&laquo;</span>'
	+'        </a>'
	+'      </li>'
	+'    </c:if>'
	+'  <c:forEach begin="${page.pageStart}" end="${page.pageEnd}" step="1" +varStatus="i">'
	+'      <li><a id="page-change" href="#" +onclick="app.boardList(${i.index}); return false;">${i.index}</a></li>'
	+'    </c:forEach>'
	+'    <c:if test="${page.nextBlock}">'
	+'      <li>'
	+'        <a href="#" onclick="app.boardList(${page.pageEnd+1}); return +false;" aria-label="Next">'
	+'          <span aria-hidden="true">&raquo;</span>'
	+'        </a>'
	+'      </li>'
	+'    </c:if>'
	+'</ul>';
}

var createMyPageTab =(x, y, json, type)=>{
  var z = 0;
  var tab = '<table id="'+x+'" class="table table-'+y+'">'
    +'<tr><th>구분</th><th>내용</th>'
    +'<th>구분</th><th>내용</th></tr><tr>';
  $.each(json, (i, j)=>{
    tab += '<td><a id="a-td'+i+'" href="#">'+i+'</a></td>'
      +'<td><a id="a-td'+i+'" href="#">'+j+'</a></td>';
    if(z % 2 == 1 && z != 7){
      tab += '</tr><tr>';
    } else if(z == 7){
      tab += '</tr>';
    }
    z++;
  });
  return tab;
};


var myPage=x=>{
	return '<div id="" class="container" style="padding-bottom: 0px">'
	+'    <h3>회원정보</h3><hr />'
	+'</div>'
	+'<div class="container">'
	+'<div class="jumbotron example z-depth-5">'
	+'<div class="row">'
	+'<div class="col-sm-2">'
	+'<div class="thumbnail" style="padding: 10px">'
	+'    <img src="'+$.image()+'/profile_0.jpg" width="170px" height="170px" alt="" /><br />'
	+'    <div class="text-center">'
	+'        <button class="btn btn-basic">사진 수정</button>'
	+'    </div>'
	+'</div>'
	+'</div>'
	+'<div class="col-sm-10">'
	+'<div class="thumbnail" style="padding: 10px">'
	+'    <table id="bitc_table" class="table">'
	+'        <tr id="bitcamp_profile_table tr">'
	+'            <td >ID</td>'
	+'            <td >'+x.id+'</td>'
	+'            <td >생년</td>'
	+'            <td >'+x.ssn+'</td>'
	+'        </tr>'
	+'        <tr>'
	+'            <td >Password</td>'
	+'            <td >'+x.pass+'</td>'
	+'            <td >전화번호</td>'
	+'            <td id="td-phone">'
	+'            </td>'
	+'        </tr>'
	+'        <tr>'
	+'            <td >이름</td>'
	+'            <td >'+x.name+'</td>'
	+'            <td >이메일</td>'
	+'            <td >'+x.email+'</td>'
	+'        </tr>'
	+'        <tr>'
	+'            <td >성별</td>'
	+'            <td >남자</td>'
	+'            <td >주소</td>'
	+'            <td >'+x.addr+'</td>'
	+'        </tr>'
	+'        <tr>'
	+'            <td >계좌번호</td>'
	+'            <td ></td>'
	+'            <td >고객번호</td>'
	+'            <td ></td>'
	+'        </tr>'
	+'    </table>'
	+'</div>'
	+'</div>'
	+'</div>'
	+'<div class="text-center">'
	+'    <button class="btn btn-primary" id="update-btn">수정</button>&nbsp;&nbsp;&nbsp;'
	+'    <button class="btn btn-danger" id="drop-btn">탈퇴</button>&nbsp;&nbsp;&nbsp;'
	+'</div>'
	+'</div>'
	+'</div>';
};


function hello() {
	return '<h1>Hello AJAX 2~!!</h1>';
};
var loginView=x=>{
	return '<div id="'+x+'" class="container">'
	+'    <div class="row">'
	+'        <div class="col-md-4 col-md-offset-4">'
	+'            <div class="panel panel-success">'
	+'                <div class="panel-heading">'
	+'                    <h3 class="panel-title" style="text-align: left;"><b>로그인 페이지 입니다.</b></h3>'
	+'                </div>'
	+'                <div class="panel-body" style="padding: 30px, 10px;">'
	+'                    <form role="form">'
	+'                        <fieldset>'
	+'                            <div class="input-group">'
	+'                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>'
	+'                                <input id="id" class="form-control" placeholder="Id를 입력하세요.." value="장만호1">'
	+'                            </div>'
	+'                            <br />'
	+'                            <div class="input-group">'
	+'                                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>'
	+'                                <input id="password" class="form-control" placeholder="Password를 입력하세요." value="1">'
	+'                            </div>'
	+'                            <br />'
	+'                            <div id="div-login-btn">'
	+'                            </div>'
	+'                        </fieldset>'
	+'                    </form>'
	+'                </div>'
	+'                <div class="panel-footer text-center">'
	+'                    <p>New Member?&nbsp;&nbsp;'
	+'                    <button id="a-join" class="btn btn-danger btn-sm">Sign up</button></p>'
	+'                </div>'
	+'            </div>'
	+'        </div>'
	+'    </div>'
	+'</div>  '
};

var navigation=()=>{
	return '<style>'
	+'    .navbar-inverse {'
	+'        margin-bottom: 0px; '
	+'        border-radius: 0px;'
	+'    }'
	+'    .navbar-brand {'
	+'        width: 150px;'
	+'        font-size: 30px;'
	+'        padding-left: 30px;'
	+'        padding-right: 30px;'
	+'        text-align: center;'
	+'    }'
	+'    .navbar-header {'
	+'    }'
	+'    .sticky {'
	+'        position: fixed;'
	+'        top: 0;'
	+'        width: 100%;'
	+'    }'
	+'    .jumbotron {'
	+'        margin: 0 auto;'
	+'    }'
	+'    .bg {'
	+'        background-image: url("'+$.image()+'/chicago.jpg");'
	+'    }'
	+'    .mega-dropdown {'
	+'        position: static !important;'
	+'    }'
	+'    .mega-dropdown-menu {'
	+'        padding: 20px 15px 15px;'
	+'        text-align: center;'
	+'        width: 100%;'
	+'    }'
	+'</style>'
	+'<div class="jumbotron bg" style="padding-left: 30px;">'
	+'    <h1 style="color: white;">Welcome to Bitcamp</h1>'
	+'</div>'
	+'<div id="navbar" style="z-index: 9">'
	+'<nav class="navbar navbar-inverse">'
	+'  <div class="container-fluid">'
	+'    <div id="div-nav-1st" class="navbar-header">'
	+'        <a class="navbar-brand" href="#"><strong>BIT</strong></a>'
	+'    </div>'
	+'    <div class="collapse navbar-collapse" id="myNavbar">'
	+'      <ul class="nav navbar-nav">'
	+'        <li id="li-home" class="active"></li>'
	+'        <li><a href="#"><span class="glyphicon glyphicon-book" aria-hidden="true">&nbsp;About</span></a></li>'
	+'        <li id="li-board"></li>'
	+'        <li class="dropdown mega-dropdown">'
	+'            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"'
	+'                aria-haspopup="true" aria-expanded="false">유틸리티<span class="caret"></span>'
	+'            </a>'
	+'            <ul id="ul-util" class="dropdown-menu mega-dropdown-menu list-inline">'
	+'                 <li id="li-sequence" class="col-sm-2"></li>'
	+'                 <li id="li-math" class="col-sm-2"></li>'
	+'                 <li id="li-matrix" class="col-sm-2"></li>'
	+'                 <li id="li-sort" class="col-sm-2"></li>'
	+'                 <li id="li-application" class="col-sm-2"></li>'
	+'            </ul>'
	+'        </li>'
	+'      </ul>'
	+'      <ul class="nav navbar-nav navbar-right">'
	+'            <li id="li-login"></li>'
	+'            <li class="dropdown mega-dropdown">'
	+'                <a class="dropdown-toggle" data-toggle="dropdown" role="button"'
	+'                aria-haspopup="true" aria-expanded="false">'
	+'                    <span class="glyphicon glyphicon-search"></span>'
	+'                </a>'
	+'            </li>'
	+'      </ul>'
	+'    </div>'
	+'  </div>'
	+'</nav>'
	+'</div>'
	;
}
function createButtonNav1st() {
	return '<button id="btn-nav-1st" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">'
	+'<span class="icon-bar"></span>'
	+'<span class="icon-bar"></span>'
	+'<span class="icon-bar"></span>'
	+'</button>';
};

var createATag=x=>{
	return '<a id="'+x.id+'" href="'+x.link+'">'+x.val+'</a>';
};
var createSpan=x=>{
	return '<span id="'+x.id+'" class="glyphicon ' +x.clazz+'" aria-hidden="true">&nbsp;'+x.val+'</span>'
};

var createHTag=x=>{
	return '<h'+x.num+'>'+x.val+'</h'+x.num+'>';
};

var createDiv=x=>{
	return '<div id="'+x.id+'" class="'+x.clazz+'"></div>';
};
var createUL=x=>{
	return '<ul id="'+x.id+'" class="'+x.clazz+'"></ul>';
	}
var createLI=x=>{
	return '<li id="'+x.id+'" class="'+x.clazz+'"></li>';
}
var createInputText=x=>{
	return $('<input type="text" id="'+x.id+'"class="'+x.clazz
      +'"placeholder="example">');
}
var createButton=x=>{
	return '<button type ="button" id="'+x.id+'" class="btn '+x.clazz+'">'+x.val+'</button>';
}

var createText=x=>{
	return '<span id="'+x+'"></span>';
}

var createTab=x=>{
	var a = 1;
	var tab = '<table id="'+x.id+'" class="table table-'+x.clazz+'">'
		+'<tr><th>목록</th>'
		+'<th><a id="a-th"></a></th></tr>';
	$.each(x.json, (i, j)=> {
		tab += '<tr>'
			+'<td><a id="a-td'+i+'" href="#">'+(a++)+'. '+j+'</a></td>'
			+'<td id="'+i+'"></td>'
	});
	tab += '</tr><tr><td>결과</td><td id="td-result"></td></tr></table>'
	return tab;
};

var createNewTab=x=>{
	  var a = 1;
	  var tab = '<table id="'+x.id+'" class="table table-'+x.clazz+'">'
	    +'</table>'
	  return tab;
	};

	var createTH=x=>{
		console.log('16');
		var th = '<tr>'
	  $.each(x.list, (i, j)=> {
	    th += '<th id="'+x.id+'" style="text-align: center">'+j+'</th>'
	  })
	  th += '</tr>'
	  return th;
	}

	var createTR=x=>{
		console.log('17');
		var q= 0;
	  var t = '';
	   $.each(x.list, (i,j)=>{
	         t +='<tr id="tr_'+q+'" class="'+x.clazz+'">'
	           +createTd({list: j, q: q, clazz: x.json.clazz})+'</tr>';
	     });
	  return t;
	}
	var createTd=x=>{
		console.log('18');
	     var td = '';
	     var w=0;
	      $.each(x.list, (k,j)=>{
	          w++;
	          if(w!=3) {
	            td +='<td id="td_'+x.q+'_'+w+'" class="'+x.clazz+w+'">'
	            +j+'</td>';
	          } 
	      });
	     return td;
	}
var createAlgoTab=()=>{
	var tab = '';
	return '<table id="tab-algo" class="table table-bordered">'
	  +'<tr>'
	  +'<td id="li-arith" style="width: 50%"></td>'
	  +'<td id="result-box" rowspan="5" style="width: 50%"></td>'
	  +'</tr>'
	  +'<tr>'
	  +'<td id="li-switch"></td>'
	  +'</tr>'
	  +'<tr>'
	  +'<td id="li-geo"></td>'
	  +'</tr>'
	  +'<tr>'
	  +'<td id="li-fact"></td>'
	  +'</tr>'
	  +'<tr>'
	  +'<td id="li-fibo"></td>'
	  +'</tr>'
	  +'<tr style="background-color: #333; color: white;">'
	  +'<td id="li-result"></td>'
	  +'<td id="li-result-answer" style="font-size: 50px; text-align: center"></td>'
	  +'</tr>'
	  +'</table>';
};