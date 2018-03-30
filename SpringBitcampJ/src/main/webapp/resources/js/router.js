/**
 * 컨트롤러 같은 놈이다.
 */
function Router(x){
	sessionStorage.setItem('context',x);
	sessionStorage.setItem('javascript',x+'/resources/js');
	sessionStorage.setItem('style',x+'/resources/css');
	sessionStorage.setItem('img',x+'/resources/image');
	return{
		context: ()=>{return sessionStorage.getItem('context');},
		javascript: ()=>{return sessionStorage.getItem('javascript');},
		style: ()=>{return sessionStorage.getItem('style');},
		image: ()=>{return sessionStorage.getItem('img');}
	};
}