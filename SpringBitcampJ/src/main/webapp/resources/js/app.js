var app = app || {};

app = {init:x=>{
	    $.getScript(x+'/resources/js/router.js',()=>{
	      $.extend(new Router(x));
	      app.algorithm.onCreate();	
	    })
	  }};
app.rgx={
		isNumber : x=>{
			return typeof x === 'number' && isFinite(x);
		},
		passwordChecker : x=>{
			var r = /^[0-9a-zA-z]{4,10}$/;
			return r.test(x)?"yes":"no";
			// 숫자,영문대소문자, 4부터10까지 
		},
		adminChecker: x=>{
			   var r = /[0-9]{5}$/;      
			   return r.test(x)?"yes":"no";
		}
		
}
app.home=( x =>{
	var $wrapper,context,view,data;
	var onCreate =()=>{
	    $wrapper = $('#wrapper');
	    $content = $('#content');
	    context = $.context();
	    view = $.javascript()+'/view.js';
	    data = $.javascript()+'/data.js';
	    setContentView();
	};
	
	var setContentView=()=>{
			move();
	};
	var move =x=>{			
			$.getScript(x,()=>{
				$('#li-home').empty();
			$content.html($(createDiv({id:'',clazz:'container'})).attr('style', 'margin-top: 50px;'));
	    	$(createATag({id:'a-home',link:'#', val:createSpan({id:'',clazz:'glyphicon-home',val:'HOME'})}))
	    	.appendTo('#li-home')
	    	.click(()=>{
	    		app.member.onCreate();
	    	});	  
		});
	}
	return{onCreate:onCreate};
})();
app.navi=(x=>{
	    var $wrapper,context,algo,view,image;
	        var onCreate=x=>{
	             $wrapper = $('#wrapper');
	             $content = $('#content');
	             context = $.context();
	             image = $.image();
	             view = $.javascript()+'/view.js';
	             setContentView();
	             app.home.onCreate(view);
	        };
	        var setContentView = x =>{
	             $(createATag({
	                 id:'a-board',link:'#',
	                 val:createSpan({
	                     id:'span-board',
	                     clazz:'glyphicon-map-marker',
	                     val:'게시판'})}))
	            .appendTo($('#li-board'))
	            .on('click',e=>{
	                e.preventDefault();
	                  app.board.onCreate();
	                  $('#a-board').remove();
	                 $(createATag({
	                     id:'a-board',link:'#',
	                     val:createSpan({
	                         id:'span-board',
	                         clazz:'glyphicon-map-marker',
	                         val:'글쓰기'})}))
	               .appendTo($('#li-board'))
	               .on('click',e =>{
	                    e.preventDefault();
	                      app.board.boardWriting();
	               });
	            });
	         $(createButtonNav1st())
	                 .appendTo($('#div-nav-1st'))
	                 .click(()=>{
	                 alert('Button click!!');
	             });
	         jason = {clazz : 'glyphicon-user',val:'로그인'};
	         jason = {id:'a-login',link:'#',val : createSpan(jason)};
	         $(createATag(jason))
	                .appendTo($('#li-login'))
	                 .click(()=>{
	                 alert('LOGIN BUTTON CLICK');
	         });
	         $(createSelect({id:'select-id',name:'user',
	        	 op: createOption({
	        		 op:'member',
	        		 sel:'selected',
	        		 val:'회원'})}))
	        		 .appendTo($('#search-option'))
	        $(createOption({op:'admin',sel:'',val:'관리자'})).appendTo('#select-id')
	         
	    };
	    return {onCreate:onCreate};
	})();
app.board=(x=>{
	var $wrapper,context,view,data;
	var onCreate =()=>{
	    $wrapper = $('#wrapper');
	    $content = $('#content');
	    context = $.context();
	    view = $.javascript()+'/view.js';
	    data = $.javascript()+'/data.js';
	    setContentView();
	};
	
	var setContentView=()=>{
		articles(1);
	};

	var boardWriting=()=>{
        $.getScript(view,()=>{
            $('#content').html($(createForm({
                id : 'form-write',
                clazz : '',
                action : ''
            })).html(boardW({
                id : 'board-wirte'
            })));  
            $(createButton({
                id : 'a-submit',
                clazz: '',
                val : '전송'
            })).appendTo('#div-btn-group').on('click',e=>{
                e.preventDefault();
               /* $.post( context+'/board/post/articles', {
                         name : $('input-name').val(),
                         title : $('input-title').val(),
                         content : $('input-content').text()
                         
                }, x=>{
                    $( ".result" ).html(data);
                  });*/
                $.ajax({
                    url : context + '/board/post/articles',
                    data:JSON.stringify({
                        id : $('#input-id').val(),
                        title : $('#input-title').val(),
                        content : $('#input-content').val()
                    }),
                    dataType:'json',
                    contentType:'application/json',
                    method:'POST',
                    success:d=>{
                    	  alert('글 등록만 성공');
                       
                    },
                    error:function(x,s,m){alert(m);}
                });
            });
            $(createButton({
                id : 'a-cancel',
                clazz: '',
                val : '취소'
            })).appendTo('#div-btn-group').on('click',e=>{
                e.preventDefault();
            });
            $(createButton({
                id : 'a-fileupload',
                clazz: '',
                val : '파일추가'
            })).appendTo('#div-btn-group').on('click',e=>{
                e.preventDefault();
                $.magnificPopup.open(
                        {items:
                             {src : $(createForm({
                                 id : 'form-fileupload',
                                 clazz : 'form-fileupload',
                                 action : context+'/board/file/upload'
                             })).append(
                                     '<div class="text-center popup">'
                                     +'<h1>FILE UPLOAD</h1>'
                                     +'<div class="row">'
                                     +'<div class="col-sm-6 col-sm-offset-3">'
                                     +'<div id="imaginary_container">'
                                     +'<div id="div-fileupload" class="input-group">'
                                     +'<span id="span-file-1" class="glyphicon glyphicon-sort fa-5x" style="font-size:20px;">'
                                     +'</span><span id="span-file-2" class="glyphicon glyphicon-sort fa-5x" style="font-size:20px;"></span>'
                                     +'</div>'
                                     +'</div>'
                                     +'</div>'
                                     +'</div>'
                             )},
                            type : 'inline'},
                            0);
                $(createInput({id : '"btn-group', clazz : 'form-control-display-inline', 
                    type : 'file', val : '선 택', ph : 'C-file'}))
                    .attr('style', 'border: 1px solid gray; width: 100%')
                    .appendTo('#div-fileupload');
                     
                $(createInput({id : 'btn btn-cancel', clazz : 'btn-danger', 
                    type : 'reset', val : '취소', ph : 'reset'}))
                    .appendTo('#span-file-2')
                    .on('click', e=>{
                      
                      alert('cancel click!')
                    });
                  
                $(createInput({id : 'btn btn-confirm', clazz : 'btn-primary', 
                    type : 'submit', val : '전송', ph : ''}))            
                    .appendTo('#span-file-1')
                    .on('click', e=>{
                      
                    	 $('#form-fileupload').ajaxForm({
                             url : context + '/board/file/upload',
                             dataType : 'text',
                             enctype : "multipart/form-data",
                             beforeSubmit : function(){
                                 alert("로딩화면 !");
                             },
                             success : function(data) {
                                 alert("등록완료 !" + data.result);
                             }
                         }).submit();
                    });
                });
        });
    };
	var articles=x=>{
		 $.getJSON(context+'/articles/'+x, d=>{
			    $.getScript(view, ()=>{
			      $('#content')
			        .html(
			          $(createDiv({id : 'div-board', clazz : 'container text-center'}))
			          .attr('style', 'margin-top: 50px; background-color: white; padding: 50px')
			          .append($(createNewTab({id : 'tab-articles', clazz : 'bordered'})))
			          );
			          $(createTH({id : 'th-articles', list : ['No.', '제목', '작성일', '수정/삭제']}))
			          .attr('style', 'background-color: #333; color: white; height: 40px')
			          .appendTo('#tab-articles');
			          $(createTR({list : d.list, page : d.page, clazz : '', json: {list : '', clazz :'flag-'}})).appendTo('#tab-articles')
			          .attr('style', 'text-align: center; border-bottom: 1px solid gray; height: 40px');
			         $('.flag-5').html($(createButton({id:'',clazz:'',val:'수정'})).attr('style','color: green'))
			         .append($(createButton({id:'',clazz:'',val:'삭제'})).attr('style','color: red'))
			          $(createNav({id:'nav-page',clazz:''})).appendTo('#content').appendTo('#div-board');
			          $(createUL({id:'ul-page',clazz:'pagination'})).appendTo('#nav-page');
			          var t = '';
			          if(d.page.preBlock){
			        	  t +='<li>'
			        		+'        <a href="#" onclick="app.board.articles('+d.page.prev+'); return false;" aria-label="Previous">'
			        		+'          <span aria-hidden="true">&laquo;</span>'
			        		+'        </a>'
			        		+'      </li>';
			          }for(var i=d.page.pageStart;i<=d.page.pageEnd; i++){
			        	  
			        	  if(i==d.page.pageNum){
			        		  t+='<li><a style="color:red" href="#">'
			        			  +'<font>'+i+'</font></a></li>';
			        	  }else{
			        			t+= '<li><a href="#" onclick="app.board.articles('+i+'); return false;">'+i+'</a></li>';		        			
			        	  }			   
			          }
			          if(d.page.nextBlock){
			        	t+=	'<li>'
			        	+'        <a href="#" onclick="app.board.articles('+d.page.next+'); return false;" aria-label="Next">'
			        	+'          <span aria-hidden="true">&raquo;</span>'
			        	+'        </a>'
			        	+'      </li>';
			          }
			          $('#ul-page').html(t);
			          $(createHTag({num:'1',val:'총 게시글 수 : '+d.page.totalCount})).appendTo('#nav-page');
			    });
			   
			    });
	}
	return{onCreate:onCreate,articles:articles,boardWriting:boardWriting};
})();

app.member=(()=>{
	var $wrapper,context,view,data;
	var onCreate =()=>{
	    $wrapper = $('#wrapper');
	    $content = $('#content');
	    context = $.context();
	    view = $.javascript()+'/view.js';
	    data = $.javascript()+'/data.js';
	    setContentView();
	};
	
	var setContentView=()=>{
		$.getScript(view, ()=>{
			$content.html(
			$(createDiv({id:'content',clazz:'container'}))
			.attr('style', 'margin-top: 50px; border: 2px dashed red; padding: 20px')
			.append(loginView('div-login')));
			$(createButton({id:'login-btn',clazz:'btn-primary btn-block',val:'LOGIN'}))
			.appendTo('#div-login-btn')
			.on('click', e=>{
				e.preventDefault();
					login();
			});
			$(createButton({id:'join-btn',clazz:'btn btn-danger btn-sm',val:'SIGN'}))
			.appendTo('#div-join-btn')
			.on('click',e=>{
				
				
				if(app.rgx.isNumber($('#input-pass').val())==='yes'){;
					alert('회원가입?');		
					$('#content').html($(join()))
				}else{
					alert('정규식에 맞지않습니다.');
				}
				
			});
			$(createButton({id:'admin-btn',clazz:'',val:'ADMIN'}))
			.appendTo('#div-join-btn')
			.on('click',()=>{
				if(confirm('관리자?')){
					var json = 
					{id: prompt('직원ID를 입력하세요.'),
                	pass: prompt('직원PASS를 입력하세요.')};
					if(app.rgx.adminChecker(json.id)==='yes'){					
						 $.ajax({
		                        url : context+'/admin/'+json.id+'/login', 
		                        data : JSON.stringify(json),
		                        dataType : 'json',
		                        contentType : 'application/json',
		                        method : 'POST',
		                        success : x =>{
		                          if(x.success === '1'){	                        	  
		          					$('#content').html($(Admin()))
		                          }else{
		                        	  alert('2');
		                        	 
		                          }
		                        }
		                        });
					}else{
					
						alert('잘못 입력');
					
					}
				}else{
					alert('7');
					alert('직원만 접근가능');
					alert('8');
				};
				/*admin();*/
			});

	var login=()=>{
		var json = {
				'id' : $('#id').val(),
				'pass' : $('#password').val()
		}
		$.ajax({
			url : context+'/member/'+id+'/login',
			method : 'POST',
			data : JSON.stringify(json),
			dataType : 'json',
			contentType : 'application/json',
			success : x=>{
				if(x.success==='1'){
					alert('로그인 ID : '+x.member.id);
					var json = x.member;
					mypage(json);
					
				}else{
					alert('로그인 실패 ID : '+x.member.id);
				}
			},
			error : (x, h, m)=>{
				alert('로그인에서 에러 발생 x='+x+', h='+h+', m='+m);
				}
			});

		};
	});
};
/*	var mypage=x=>{
		$.getScript(view, ()=>{
			$('#content').html(myPage(x));
			$(function() {
				var phone = (x.phone === '') ? "개통하기" : x.phone;
				console.log(phone);
				$(createATag('', phone)).appendTo('#td-phone');
			});
		});
	
	};*/
	var mypage=x=>{
	    var id = x.id;
	    var pass = x.pass;
	    $.getScript(view, ()=>{
	      $content.html(
	        $(createDiv({id : 'div-myPage', clazz : 'container'}))
	        .append(myPage(x))
	      );
	        $(createDiv({id : 'div-mypage2', clazz : 'container'}))
	        .attr('style', 'background-color: white; margin-bottom: 40px; padding: 20px 100px')
	        .append(createMyPageTab('', 'table', x, 'default'))
	        .appendTo('#div-myPage')
	      $(function() {
	        var phone = (x.phone === '') ? "개통하기" : x.phone;
	        console.log(phone);
	        $(createATag({id : '', val : phone})).appendTo('#td-phone');
	      });
	    });
	  };
	return {onCreate:onCreate};
})();

app.algorithm=(()=>{
	var $wrapper,context,algorithm,view;
	var onCreate =()=>{
	    $wrapper = $('#wrapper');
	    $content = $('#content');
	    context = $.context();
	    view = $.javascript()+'/view.js';
	    algo = $.javascript()+'/algo.js';
	    setContentView();
	};
	var setContentView=()=>{
		$wrapper.empty();
	    $.getScript(view, ()=>{
	    	$wrapper.html(navigation());
	    	app.navi.onCreate();
	    	$content.html($(createDiv({id:'divhome',clazz:'container'})).attr('style', 'margin-top: 50px;'));
	    	$(createATag({id:'',link:'#',val:'수열'}))
	    	.appendTo('#li-sequence')
	    	.click(()=>{
	    		$content.html($(createDiv({id:'content',clazz:'container'})).attr('style', 'margin-top: 50px;')
	    				.append(createHTag('2', '수열 알고리즘'))
	    				.append(createAlgoTab()));
	    		$('#tab-algo').attr('style', 'background-color: white;')
	    		$('#result-box').attr('style', 'padding: 20px 100px;')
	    		var $left=$('#tabLeft'),$right=$('#result-box'),$result=$('#li-result-answer');
	    		$(createUL({id:'ul-seq',clazz:'list-group'})).appendTo($left);
	            $(createLI({id:'li-arith',clazz:'list-group-item'})).appendTo('#ul-seq');
	            $(createLI({id:'li-switch',clazz:'list-group-item'})).appendTo('#ul-seq');
	            $(createLI({id:'li-geo',clazz:'list-group-item'})).appendTo('#ul-seq');
	            $(createLI({id:'li-face',clazz:'list-group-item'})).appendTo('#ul-seq');
	            $(createLI({id:'li-fibo',clazz:'list-group-item'})).appendTo('#ul-seq');
	            $(createLI({id:'li-result',clazz:'list-group-item'})).appendTo('#ul-seq');
	            $(createATag({id:'a-arith',link:'#',val:'등차수열의 합'})).appendTo('#li-arith');
	            $(createATag({id:'a-switch',link:'#',val:'스위치수열의 합'})).appendTo('#li-switch');
	            $(createATag({id:'a-geo',link:'#',val:'등비수열의 합'})).appendTo('#li-geo');
	            $(createATag({id:'a-face',link:'#',val:'팩토리얼수열의 합'})).appendTo('#li-fact');
	            $(createATag({id:'a-fibo',link:'#',val:'피보나치수열의 합'})).appendTo('#li-fibo');
	            $(createATag({id:'',link:'#',val:'결과'})).attr('style', 'color:white').appendTo('#li-result');
	            // Default
	            createInputText({id:'first',clazz:'from-control',text:'text'})
				.attr('placeholder','초기값 입력')
				.attr('style', 'background-color: #faffbd')
				.appendTo($right);
				createInputText({id:'last',clazz:'form-control',text:'text'})
				.attr('placeholder','리미트값 입력')
				.attr('style', 'background-color: #faffbd')
				.appendTo($right);
				createInputText({id:'differ',clazz:'form-control',text:'text'})
				.attr('placeholder','공차 입력')
				.attr('style', 'background-color: #faffbd')
				.appendTo($right);
				$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
				.appendTo($right)
				.attr('style','margin-top:10px;')
				.on('click',()=>{
					alert('click!');
	    			var x = $('#first').val();
	    			var y = $('#last').val();
	    			var z = $('#differ').val();
	    			if(x!=='' && x>0 && y!=='' && y>0 && z!=='' && z>0 ) {
	    				$.getScript(algo, ()=>{
	    					alert('if true!');
	    					$('#li-result-answer').text(arith(x, y, z));
			    			$('#first').val("");
			    			$('#last').val("");
			    			$('#differ').val("");
	    				});
	    			} else {
	    				alert('값을 넣어주세요!');
	    			}
	    		});	
				$('#a-arith').attr('style', 'color: red; font-weight:bold');
				$('#a-switch').attr('style', 'color: black');
				$('#a-geo').attr('style', 'color: black');
				$('#a-fact').attr('style', 'color: black');
				$('#a-fibo').attr('style', 'color: black');
				$('#a-arith').on('click', ()=>{
					$right.empty();
					$result.empty();
		            createInputText({id:'first',clazz:'from-control',text:'text'})
					.attr('placeholder','초기값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					createInputText({id:'last',clazz:'form-control',text:'text'})
					.attr('placeholder','리미트값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					createInputText({id:'differ',clazz:'form-control',text:'text'})
					.attr('placeholder','공차 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
				
					$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click',()=>{
						alert('click!');
		    			var x = $('#first').val();
		    			var y = $('#last').val();
		    			var z = $('#differ').val();
		    			if(x!=='' && x>0 && y!=='' && y>0 && z!=='' && z>0 ) {
		    				$.getScript(algo, ()=>{
		    					alert('if true!');
		    					$('#li-result-answer').text(arith(x, y, z));
				    			$('#first').val("");
				    			$('#last').val("");
				    			$('#differ').val("");
		    				});
		    			} else {
		    				alert('값을 넣어주세요!');
		    			}
		    		});
					$('#a-arith').attr('style', 'color: red; font-weight:bold');
					$('#a-switch').attr('style', 'color: black');
					$('#a-geo').attr('style', 'color: black');
					$('#a-fact').attr('style', 'color: black');
					$('#a-fibo').attr('style', 'color: black');
				});
	
		
				$('#a-switch').on('click', ()=>{
					$right.empty();
					$result.empty();
		           
		            createInputText({id:'first',clazz:'from-control',text:'text'})
					.attr('placeholder','초기값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
		            
					createInputText({id:'last',clazz:'form-control',text:'text'})
					.attr('placeholder','리미트값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					createInputText({id:'differ',clazz:'form-control',text:'text'})
					.attr('placeholder','공차 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
				
					$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click',()=>{
						alert('switch click!');
		    			var x = $('#first').val();
		    			var y = $('#last').val();
		    			var z = $('#differ').val();
		    			if(x!=='' && x>0 && y!=='' && y>0 && z!=='' && z>0 ) {
		    				$.getScript(algo, ()=>{
		    					alert('if true!');
		    					$('#li-result-answer').text(switchSeq(x, y, z));
				    			$('#first').val("");
				    			$('#last').val("");
				    			$('#differ').val("");
		    				});
		    			} else {
		    				alert('값을 넣어주세요!');
		    			}

		    		});
					$('#a-arith').attr('style', 'color: black');
					$('#a-switch').attr('style', 'color: red; font-weight:bold');
					$('#a-geo').attr('style', 'color: black');
					$('#a-fact').attr('style', 'color: black');
					$('#a-fibo').attr('style', 'color: black');
				});
				$('#a-geo').on('click', ()=>{
					$right.empty();
					$result.empty();
		            
		            createInputText({id:'first',clazz:'from-control',text:'text'})
					.attr('placeholder','초기값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
		           
					createInputText({id:'last',clazz:'form-control',text:'text'})
					.attr('placeholder','리미트값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					createInputText({id:'differ',clazz:'form-control',text:'text'})
					.attr('placeholder','공차 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click',()=>{
						alert('geo click!');
		    			var x = $('#first').val();
		    			var y = $('#last').val();
		    			var z = $('#differ').val();
		    			if(x!=='' && x>0 && y!=='' && y>0 && z!=='' && z>0 ) {
		    				$.getScript(algo, ()=>{
		    					alert('if true!');
		    					$('#li-result-answer').text(geo(x, y, z));
				    			$('#first').val("");
				    			$('#last').val("");
				    			$('#differ').val("");
		    				});
		    			} else {
		    				alert('값을 넣어주세요!');
		    			}

		    		});
					$('#a-arith').attr('style', 'color: black');
					$('#a-switch').attr('style', 'color: black');
					$('#a-geo').attr('style', 'color: red; font-weight:bold');
					$('#a-fact').attr('style', 'color: black');
					$('#a-fibo').attr('style', 'color: black');
				});
				
				$('#a-fact').on('click', ()=>{
					$right.empty();
					$result.empty();
					
					createInputText({id:'first',clazz:'form-control',text:'text'})
					.attr('placeholder','초기값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					createInputText({id:'last',clazz:'form-control',text:'text'})
					.attr('placeholder','리미트값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
				
					$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click',()=>{
						alert('fact click!');
		    			var x = $('#first').val();
		    			var y = $('#last').val();
		    			var z = $('#differ').val();
		    			if(x!=='' && x>0 && y!=='' && y>0) {
		    				$.getScript(algo, ()=>{
		    					alert('if true!');
		    					$('#li-result-answer').text(fact(x, y));
				    			$('#first').val("");
				    			$('#last').val("");
				    			$('#differ').val("");
		    				});
		    			} else {
		    				alert('값을 넣어주세요!');
		    			}

		    		});
					$('#a-arith').attr('style', 'color: black');
					$('#a-switch').attr('style', 'color: black');
					$('#a-geo').attr('style', 'color: black');
					$('#a-fact').attr('style', 'color: red; font-weight:bold');
					$('#a-fibo').attr('style', 'color: black');
				});
				
				$('#a-fibo').on('click', ()=>{
					$right.empty();
					$result.empty();
					
					createInputText({id:'first',clazz:'form-control',text:'text'})
					.attr('placeholder','첫번째 갑 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					createInputText({id:'differ',clazz:'form-control',text:'text'})
					.attr('placeholder','두번째값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					createInputText({id:'last',clazz:'form-control',text:'text'})
					.attr('placeholder','리밋값 입력')
					.attr('style', 'background-color: #faffbd')
					.appendTo($right);
					
					$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click',()=>{
						alert('fibo click!');
		    			var x = $('#first').val();
		    			var y = $('#last').val();
		    			var z = $('#differ').val();
		    			if(x!=='' && x>0 && y!=='' && y>0 && z!=='' && z>0) {
		    				$.getScript(algo, ()=>{
		    					alert('if true!');
		    					$('#li-result-answer').text(fibo(x, y, z));
				    			$('#first').val("");
				    			$('#last').val("");
				    			$('#differ').val("");
		    				});
		    			} else {
		    				alert('값을 넣어주세요!');
		    			}

		    		});
					$('#a-arith').attr('style', 'color: black');
					$('#a-switch').attr('style', 'color: black');
					$('#a-geo').attr('style', 'color: black');
					$('#a-fact').attr('style', 'color: black');
					$('#a-fibo').attr('style', 'color: red; font-weight:bold');
				});
				
	    	});
	    	
	    	
	    
	    	$(createATag({id:'',val:'수학'}))
	    	.appendTo('#li-math')
	    	.click(()=>{
	    		alert('math button click!');
	    		$.getScript(algo, ()=>{
	    			$content.html($(createDiv({id:'content-tab',clazz:'container'})).attr('style', 'margin-top: 50px;')
	    					.append(createHTag({id:'2',val:'수학 알고리즘'}))
	    					.append(createTab({id:'tab-math', clazz:'border', json:mathList()})));
	    			$('#tab-math').attr('style', 'background-color: white');
	    			$('#tab-math tr th').attr('style', 'background-color: #333; color: white; width: 50%');
	    			$('#a-th').attr('style', 'color: white');
	    			$('#1').remove();
	    			$('#2').remove();
	    			$('#3').remove();
	    			$('#4').remove();
	    			$('#5').remove();
	    			$('#0').attr('rowspan', mathList().length);
	    			$('#0').attr('style', 'background-color: #faffbd');
	    			$('#a-th').text(mathList()[0]);
	    			
	    			var $right=$('#0'), $result=$('#td-result');
	    			createInputText({id:'rangeNum',clazz:'form-control',text:'text'})
					.attr('placeholder','구할 숫자의 범위 입력')
					.appendTo($right);
	    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click', ()=>{
						var x = $('#rangeNum').val();
						if(x !== '' && x>1) {
							$.getScript(algo, ()=>{
								$result.text('소수? '+primeNumber(x)+', '+x+' 까지의 소수 합: '+primeNumberSum(x)
										+', '+x+' 까지의 소수 개수: '+primeNumberCount(x));
								$('#rangeNum').val("");
							});
						} else {
							alert('값을 입력해 주세요.');
						}
						
					});
	    			
					$('#a-td0').attr('style', 'color: red; font-weight:bold');
					$('#a-td1').attr('style', 'color: black');
					$('#a-td2').attr('style', 'color: black');
					$('#a-td3').attr('style', 'color: black');
					$('#a-td4').attr('style', 'color: black');
					$('#a-td5').attr('style', 'color: black');
					
					$('#a-td0').on('click', ()=>{
						$('#a-th').text(mathList()[0]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'rangeNum',clazz:'form-control',text:'text'})
						.attr('placeholder','구할 숫자의 범위 입력')
						.appendTo($right);
		    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click', ()=>{
							alert('눌림');
							var x = $('#rangeNum').val();
							if(x !== '' && x>1) {
								$.getScript(algo, ()=>{
									alert('눌림');
									$result.text('소수? '+primeNumber(x)+','+x+' 까지의 소수 합: '+primeNumberSum(x)
											+', '+x+' 까지의 소수 개수: '+primeNumberCount(x));
									$('#rangeNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
							
						});
		    			
						$('#a-td0').attr('style', 'color: red; font-weight:bold');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
						$('#a-td5').attr('style', 'color: black');
					});
					$('#a-td1').on('click', ()=>{
						$('#a-th').text(mathList()[1]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','첫번째 정수를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'secondNum',clazz:'form-control',text:'text'})
						.attr('placeholder','두번째 정수를 입력하세요.')
						.appendTo($right);
		    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click', ()=>{
							var x = $('#firstNum').val();
							var y = $('#secondNum').val();
							if(x !== '' && x>0 && y !== '' && y>0) {
								$.getScript(algo, ()=>{
									$result.text('최대공약수: '+greatestCommonDivisor(x, y)
											+', 최소공배수: '+leastCommonMultiple(x, y));
									$('#firstNum').val("");
									$('#secondNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
							
						});		    			
		    			
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: red; font-weight:bold');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
						$('#a-td5').attr('style', 'color: black');
					});
					
					
					
					$('#a-td2').on('click', ()=>{
						$('#a-th').text(mathList()[2]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control'})
						.attr('placeholder','숫자를 입력하세요.')
						.appendTo($right);
		    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click', ()=>{
							var x = $('#firstNum').val();
							if(x !== '' && x>0) {
								$.getScript(algo, ()=>{
									$result.text(x+' = '+primeFactorization(x));
									$('#firstNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
							
						});		
						
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: red; font-weight:bold');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
						$('#a-td5').attr('style', 'color: black');
					});
		    			
		    			
					$('#a-td3').on('click', ()=>{
						$('#a-th').text(mathList()[3]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','1번째 숫자를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'secondNum',clazz:'form-control',text:'text'})
						.attr('placeholder','2번째 숫자를 입력하세요.')
						.appendTo($right);	
		    			createInputText({id:'thirdNum',clazz:'form-control',text:'text'})
						.attr('placeholder','3번째 숫자를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'fourthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','4번째 숫자를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'fifthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','5번째 숫자를 입력하세요.')
						.appendTo($right);
		    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click', ()=>{
							var x = $('#firstNum').val();
							var y = $('#secondNum').val();
							var z = $('#thirdNum').val();
							var a = $('#fourthNum').val();
							var b = $('#fifthNum').val();
							if(x !== '' && y !== '' && z !== '' && a !== '' && b !== '') {
								$.getScript(algo, ()=>{
									$result.text('최대값 : '+maxNum(x, y, z, a, b)+', 최소값 : '+minNum(x, y, z, a, b));
									$('#firstNum').val("");
									$('#secondNum').val("");
									$('#thirdNum').val("");
									$('#fourthNum').val("");
									$('#fifthNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
						});
		    			
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: red; font-weight:bold');
						$('#a-td4').attr('style', 'color: black');
						$('#a-td5').attr('style', 'color: black');
					});
					$('#a-td4').on('click', ()=>{
						$('#a-th').text(mathList()[4]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','숫자를 입력하세요.')
						.appendTo($right);
		    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click', ()=>{
							var x = $('#firstNum').val();
							if(x !== '' && x>0) {
								$.getScript(algo, ()=>{
									$result.text('5의 배수 합: '+fiveMultipleSum(x));
									$('#firstNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
							
						});		
		    			
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: red; font-weight:bold');
						$('#a-td5').attr('style', 'color: black');
					});
					$('#a-td5').on('click', ()=>{
						$('#a-th').text(mathList()[5]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','1번째 숫자를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'secondNum',clazz:'form-control',text:'text'})
						.attr('placeholder','2번째 숫자를 입력하세요.')
						.appendTo($right);	
		    			createInputText({id:'thirdNum',clazz:'form-control',text:'text'})
						.attr('placeholder','3번째 숫자를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'fourthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','4번째 숫자를 입력하세요.')
						.appendTo($right);
		    			createInputText({id:'fifthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','5번째 숫자를 입력하세요.')
						.appendTo($right);
		    			$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click', ()=>{
							var x = $('#firstNum').val();
							var y = $('#secondNum').val();
							var z = $('#thirdNum').val();
							var a = $('#fourthNum').val();
							var b = $('#fifthNum').val();
							if(x !== '' && y !== '' && z !== '' && a !== '' && b !== '') {
								$.getScript(algo, ()=>{
									$result.text('근사값	 : '+findNearNum(x, y, z, a, b));
									$('#firstNum').val("");
									$('#secondNum').val("");
									$('#thirdNum').val("");
									$('#fourthNum').val("");
									$('#fifthNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
						});
		    			
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
						$('#a-td5').attr('style', 'color: red; font-weight:bold');
					});
					
	    		});
	    	});
	    	
	    	$(createATag({id:'', val:'배열'}))
	    	.appendTo('#li-matrix')
	    	.click(()=>{
	    		alert('matrix button click!');
	    		$content.html($(createDiv({id:'content-tab',clazz:'container'})).attr('style', 'margin-top: 50px;')
    					.append(createHTag({id:'2', val:'배열 알고리즘'}))
    					.append(createTab({id:'tab-matrix', clazz:'border',json: sortList()})));
	    		$('#tab-matrix').attr('style', 'background-color: white');
	    		$('#tab-matrix tr th').attr('style', 'background-color: #333; color: white; width: 50%');
	    		$('#a-th').attr('style', 'color: white');
	    		$('#1').remove();
	    		$('#2').remove();
	    		$('#3').remove();
	    		$('#4').remove();
	    		$('#0').attr('rowspan', matrixList().length);
	    		$('#0').attr('style', 'border: 2px solid gray');
	    		$('#a-th').text(matrixList()[0]);
	    	});
	    	
	    	
			
			$(createATag({id:'',val: '정렬'}))
	    	.appendTo('#li-sort')
	    	.click(()=>{
	    		alert('sort button click!');
	    		$.getScript(algo, ()=>{
	    			$content.html($(createDiv({id:'content-tab',clazz:'container'})).attr('style', 'margin-top: 50px;')
	    					.append(createHTag({id:'2', val:'정렬 알고리즘'}))
	    					.append(createTab({id:'tab-sort', clazz:'border',json: sortList()})));
	    			$('#tab-sort').attr('style', 'background-color: white');
	    			$('#tab-sort tr th').attr('style', 'background-color: #333; color: white; width: 50%');
	    			$('#a-th').attr('style', 'color: white');
	    			$('#1').remove();
	    			$('#2').remove();
	    			$('#3').remove();
	    			$('#4').remove();
	    			$('#0').attr('rowspan', sortList().length);
	    			$('#0').attr('style', 'background-color: #faffbd');
	    			$('#a-th').text(sortList()[0]);
	    			var $right=$('#0'), $result=$('#td-result');
	    			createInputText({id:'first',clazz:'form-control',text:'text'})
					.attr('placeholder','초기값 입력')
					.appendTo($right);
					createInputText({id:'last',clazz:'form-control',text:'text'})
					.attr('placeholder','리미트값 입력')
					.appendTo($right);
					createInputText({id:'differ',clazz:'form-control',text:'text'})
					.attr('placeholder','공차 입력')
					.appendTo($right);
					$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
					.appendTo($right)
					.attr('style','margin-top:10px;')
					.on('click',()=>{
						
					});
					$('#a-td0').attr('style', 'color: red; font-weight:bold');
					$('#a-td1').attr('style', 'color: black');
					$('#a-td2').attr('style', 'color: black');
					$('#a-td3').attr('style', 'color: black');
					$('#a-td4').attr('style', 'color: black');
					
					$('#a-td0').on('click', ()=>{
						$('#a-th').text(sortList()[0]);
						$right.empty();
		    			createInputText({id:'first',clazz:'form-control',text:'text'})
						.attr('placeholder','초기값 입력')
						.appendTo($right);
						createInputText({id:'last',clazz:'form-control',text:'text'})
						.attr('placeholder','리미트값 입력')
						.appendTo($right);
						createInputText({id:'differ',clazz:'form-control',text:'text'})
						.attr('placeholder','공차 입력')
						.appendTo($right);
						$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click',()=>{

						});
						$('#a-td0').attr('style', 'color: red; font-weight:bold');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
					});
					
					$('#a-td1').on('click', ()=>{
						$('#a-th').text(sortList()[1]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','1번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'secondNum',clazz:'form-control',text:'text'})
						.attr('placeholder','2번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'thirdNum',clazz:'form-control',text:'text'})
						.attr('placeholder','3번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'fourthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','4번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'fifthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','5번재 값 입력')
						.appendTo($right);
						$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click',()=>{
							var x = $('#firstNum').val();
							var y = $('#secondNum').val();
							var z = $('#thirdNum').val();
							var a = $('#fourthNum').val();
							var b = $('#fifthNum').val();
							if(x !== '' && y !== '' && z !== '' && a !== '' && b !== '') {
								$.getScript(algo, ()=>{
									$result.text(selectionSort(x, y, z, a, b));
									$('#firstNum').val("");
									$('#secondNum').val("");
									$('#thirdNum').val("");
									$('#fourthNum').val("");
									$('#fifthNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
						});
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: red; font-weight:bold');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
					});
					
					$('#a-td2').on('click', ()=>{
						$('#a-th').text(sortList()[2]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','1번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'secondNum',clazz:'form-control',text:'text'})
						.attr('placeholder','2번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'thirdNum',clazz:'form-control',text:'text'})
						.attr('placeholder','3번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'fourthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','4번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'fifthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','5번재 값 입력')
						.appendTo($right);
						$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click',()=>{
							var x = $('#firstNum').val();
							var y = $('#secondNum').val();
							var z = $('#thirdNum').val();
							var a = $('#fourthNum').val();
							var b = $('#fifthNum').val();
							if(x !== '' && y !== '' && z !== '' && a !== '' && b !== '') {
								$.getScript(algo, ()=>{
									$result.text(bubbleSort(x, y, z, a, b));
									$('#firstNum').val("");
									$('#secondNum').val("");
									$('#thirdNum').val("");
									$('#fourthNum').val("");
									$('#fifthNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
						});
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: red; font-weight:bold');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: black');
					});
										
					$('#a-td3').on('click', ()=>{
						$('#a-th').text(sortList()[3]);
						$right.empty();
						$result.empty();
		    			createInputText({id:'firstNum',clazz:'form-control',text:'text'})
						.attr('placeholder','1번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'secondNum',clazz:'form-control',text:'text'})
						.attr('placeholder','2번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'thirdNum',clazz:'form-control',text:'text'})
						.attr('placeholder','3번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'fourthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','4번재 값 입력')
						.appendTo($right);
		    			createInputText({id:'fifthNum',clazz:'form-control',text:'text'})
						.attr('placeholder','5번재 값 입력')
						.appendTo($right);
						$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click',()=>{
							var x = $('#firstNum').val();
							var y = $('#secondNum').val();
							var z = $('#thirdNum').val();
							var a = $('#fourthNum').val();
							var b = $('#fifthNum').val();
							if(x !== '' && y !== '' && z !== '' && a !== '' && b !== '') {
								$.getScript(algo, ()=>{
									$result.text(insertSort(x, y, z, a, b));
									$('#firstNum').val("");
									$('#secondNum').val("");
									$('#thirdNum').val("");
									$('#fourthNum').val("");
									$('#fifthNum').val("");
								});
							} else {
								alert('값을 입력해 주세요.');
							}
						});
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: red; font-weight:bold');
						$('#a-td4').attr('style', 'color: black');
					});
					$('#a-td4').on('click', ()=>{
						$('#a-th').text(sortList()[4]);
						$right.empty();
		    			createInputText({id:'first',clazz:'form-control',text:'text'})
						.attr('placeholder','초기값 입력')
						.attr('style', 'background-color: #faffbd')
						.appendTo($right);
						createInputText({id:'last',clazz:'form-control',text:'text'})
						.attr('placeholder','리미트값 입력')
						.attr('style', 'background-color: #faffbd')
						.appendTo($right);
						createInputText({id:'differ',clazz:'form-control',text:'text'})
						.attr('placeholder','공차 입력')
						.attr('style', 'background-color: #faffbd')
						.appendTo($right);
						$(createButton({id:'btn-result',clazz:'btn-primary',val:'결과 보기'}))
						.appendTo($right)
						.attr('style','margin-top:10px;')
						.on('click',()=>{
						});
						$('#a-td0').attr('style', 'color: black');
						$('#a-td1').attr('style', 'color: black');
						$('#a-td2').attr('style', 'color: black');
						$('#a-td3').attr('style', 'color: black');
						$('#a-td4').attr('style', 'color: red; font-weight:bold');
					});
	    		});
	    	});
	    });
	  };
	return {onCreate:onCreate};
})();