// 등차수열 초기값, 리밋값, 공차
// 1+3+5+....+
var arith =(x, y, z)=>{
	var  x = x*1, y = y*1, z = z*1;
	var sum = 0;
	var k = x;
	var str = "";
	sum = x;
	for(var i=1; i<y; i++) {
		k += z;
		sum += k;
	};
	return str+sum;
};

//스위치수열 초기값, 리밋값, 공차
var switchSeq =(x, y, z)=>{
	var  x = x*1, y = y*1, z = z*1;
	var SW = 0;
	var k = x;
	var sum = 0;
	var str = "";
	for(var i=1; i<=y; i++){
		if(SW == 0) {
			k += z;
			sum += k;
			SW=1;
		} else {
			k += z;
			sum -= k;
			SW=0;
		}
	};
	return str+sum;
};

// 등비수열
var geo =(x, y, z)=> {
	var  x = x*1, y = y*1, z = z*1;
	var k = x;
	var sum = x;
	var str = "";
	for(var i=1; i<y; i++){
		k *= z;
		sum += k;
	};
	return str+sum;
};

// 팩토리얼
var fact =(x, y)=>{
	var  x = x*1, y = y*1;
	var sum = 0;
	var k = x;
	var str = "";
	for(var i=1; i<=y; i++) {
		k *= i;
		sum += k;
	};
	return str+sum;
};

// 피보나치
var fibo=(x, y, z)=>{
	var  x = x*1, y = y*1, z = z*1;
	var a = x;
	var b = z;
	var c = a + b;
	var str = "";
	var sum = a+b;
	for(var i=1; i<y-1; i++){
		sum += c;
		a = b;
		b = c;
		c = a + b;
	};
	return str+sum;
};

// 소수판별
var primeNumber=x=>{
	var x = x*1;
	var c = "yes";
	for(var i=2; i<x; i++){
		if(x%i == 0) {
			c = "No!";
			break;
		} 
	}
	return c;
};

// 소수개수
var primeNumberCount=x=>{
	var x = x*1;
	var k = 2
	var count = 0;
	var str = "";
	for(var i=2; i<=x; i++) {
		for(var j=2; j<=i; j++){
			if((i%j)==0) {
				if(i==j) {
					count++;
					break;
				} else {
					break;
				}
			}
		}
	}
	return str+count;
};

// 소수의 합
var primeNumberSum=x=>{
	var x = x*1;
	var sum = 0;
	var str = "";
	for(var i=2; i<=x; i++) {
		for(var j=2; j<=i; j++){
			if((i%j)==0) {
				if(i==j) {
					sum+=i;
					break;
				} else {
					break;
				}
			}
		}
	}
	return str+sum;
};

// 최대공약수
var greatestCommonDivisor=(x, y)=>{
	var x = x*1, y = y*1;
	var j;
	var temp;
	var str = "";
	j = (x<y) ? x : y;
	for(var i=1; i<=j; i++){
		if(x%i == 0 && y%i == 0) {
			temp = i;
		}
	}
	return str+temp;
}; 

// 최소공배수
var leastCommonMultiple=(x, y)=>{
	var x = x*1, y = y*1;
	var j;
	var temp;
	var str = "";
	j = (x>y) ? x : y;
	for(var i=j;;i++){
		if(i%x==0 && i%y==0) {
			temp = i;
			break;
		}
	}
	return str+temp;
};

// 소인수 분해
var primeFactorization=x=>{
	var x = x*1;
	var c = "";
	for(var i=2; i<=x; i++){
		if(x%i == 0) {
			if(x==i) {
				c += i;
				x = x/i;
				i--;
			} else {
				c += i+"X";
				x = x/i;
				i--;
			}
		} 
	}
	return c;
};

var maxNum=(x, y, z, a, b)=>{
	var x=x*1, y=y*1, z=z*1, a=a*1, b=b*1;
	var num = [x,y,z,a,b];
	var max = num[0];
	var str = "";
	for(var i=1; i<5; i++){
		if(max < num[i]) {
			max = num[i];
		}
	}
	return str + max;
};

var minNum=(x, y, z, a, b)=>{
	var x=x*1, y=y*1, z=z*1, a=a*1, b=b*1;
	var num = [x,y,z,a,b];
	var min = num[0];
	var str = "";
	for(var i=1; i<5; i++){
		if(min > num[i]) {
			min = num[i];
		}
	}
	return str + min;
};

var fiveMultipleSum=x=>{
	var x=x*1;
	var sum=0;
	var str="";
	for(var i=1; i<=x; i++){
		if(i%5==0) {
			sum += i;
		}
	}
	return str+sum;
};

var findNearNum=(x, y, z, a, b)=>{
	var x=x*1, y=y*1, z=z*1, a=a*1, b=b*1;
	var num = [x,y,z,a,b];
	var near = 7;
	var min = Number.MAX_SAFE_INTEGER;
	var nearNum = 0;
	var str = "";
	for(var i=0; i<num.length; i++){
		var abs = Math.abs(num[i] - near);
		if(min > abs) {
			min = abs;
			nearNum = num[i];
		}
	}
	return str + nearNum;
};

var selectionSort=(x, y, z, a, b)=>{
	var x=x*1, y=y*1, z=z*1, a=a*1, b=b*1;
	var arr = [x,y,z,a,b];
	var temp = 0;
	var str = "";
	for(var i=0; i<arr.length; i++) {
		for(var j=i+1; j<=arr.length; j++) {
			if(arr[i] > arr[j]){
				temp = arr[i];
				arr[i] = arr[j];
				arr[j] = temp;
			}
		}
	}
	for(var i=0; i<arr.length; i++) {
		if(i != arr.length-1) {
			str += arr[i] + ", "
		} else {
			str += arr[i]
		}
	}
	return str;
};

var bubbleSort=(x, y, z, a, b)=>{
	var x=x*1, y=y*1, z=z*1, a=a*1, b=b*1;
	var arr = [x,y,z,a,b];
	var str = "";
	var temp = 0;
	console.log(x);
	for(var i=1; i<arr.length; i++){
		for(var j=0; j<arr.length-i; j++) {
			if(arr[j] > arr[j+1]) {
				temp = arr[j+1];
				arr[j+1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	for(var i=0; i<arr.length; i++) {
		if(i != arr.length-1) {
			str += arr[i] + ", "
		} else {
			str += arr[i]
		}
	}
	return str;
};

var insertSort=(x, y, z, a, b)=>{
	var x=x*1, y=y*1, z=z*1, a=a*1, b=b*1;
	var arr = [x,y,z,a,b];
	var str = "";
	var key = 0;
	for(var i=1; i<arr.length; i++){
		key = arr[i];
		for(var j=i-1; j>=0; j--) {
			if(arr[j] > key) {
				arr[j+1] = a[j];
			} else {
				break;
			}
		}
		arr[i] = key;
	}
	for(var i=0; i<arr.length; i++) {
		if(i != arr.length-1) {
			str += arr[i] + ", "
		} else {
			str += arr[i]
		}
	}
	return str;
};

var fiveByFive=()=>{
	var a = new Array();
	var o = null;
	var k = 1;
	for(var i=0; i<5; i++){
	    o = new Object();
	    o.a = k++;
	    o.b = k++;
	    o.c = k++;
	    o.d = k++;
	    o.e = k++;
	    a.push(o);
	}
	return JSON.stringify(a);
};

var sortList=()=>{
	var x = ['기본 행렬','선택 정렬','버블 정렬','삽입 정렬','석차 구하기'];
	return x;
};

var mathList=()=>{
	var x = ['소수의 합 구하기', '최대공약수', '소인수분해', '최대값, 최소값', '5의 배수의 합', '7에 가장 가까운 수'];
	return x;
};

var googleChart =()=>{
	console.log('들어옴');
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() {
	  var data = google.visualization.arrayToDataTable([
	  ['항목', '출석일', {role:'annotation'}, {role:'style'}],
	  ['박상우', 80, '메뚜기', '#e2431e'],
	  ['장만호', 54, '달팽이', '#e7711b'],
	  ['김정원', 48, '문어', '#f1ca3a'],
	  ['구민우', 13, '상어', '#6f9654']
	]);
	  var options = {'legend':'left', 'title':'출석률', 'height':400, 'stroke-width': 10};
	  var chart = new google.visualization.ColumnChart(document.getElementById('div-home'));
	  chart.draw(data, options);
	}
}

