package com.bitcamp.web.domain;



import org.springframework.stereotype.Component;


@Component
public class Page {
	int 
	totalCount,pageEnd,startRow,endRow,blockSize,pageNum,pageSize,pageStart,totalPage,next,prev;
	public int getPrev() {
		return prev;
	}
	public void setPrev(int prev) {
		this.prev = pageEnd-pageSize;
	}
	boolean preBlock,nextBlock;
	public int getNext() {
		return next;
	}
	public void setNext(int next) {
		this.next = pageStart+pageSize;
	}
	public boolean isPreBlock() {
		return preBlock;
	}
	public void setPreBlock(boolean preBlock) {
		this.preBlock = (pageStart==1)? false : true;
	}
	public boolean isNextBlock() {
		return nextBlock;
	}
	public void setNextBlock(boolean nextBlock) {
		this.nextBlock = (pageEnd!=totalPage)? true : false;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = (totalCount % pageSize == 0) ? totalCount / pageSize : (totalCount /pageSize) + 1;
	}
	public int getPageStart() {
		return pageStart;
	}
	public void setPageStart(int pageStart) {
		/*this.pageStart = (pageEnd % blockSize == 0 )? pageEnd/blockSize : blockSize - 4;*/
		
		this.pageStart = ((pageNum-1)/pageSize)*pageSize+1;
	}
	
	public int getTotalCount() {
		return totalCount;
	}
	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}
	public int getPageEnd() {
	
		return pageEnd;
	}//
	public void setPageEnd(int pageEnd) {
		// pageNum
		 pageEnd=((pageNum-1)/pageSize)*pageSize+pageSize;
		
		this.pageEnd = (pageEnd>=totalPage)?totalPage:pageEnd;
	}// 26 % 26  = 0 = pagestart+4 : totalcount
	public int getStartRow() {
		return startRow;
	}
	public void setStartRow(int startRow) {
		/*((pageNum-1)/pageSize)*pageSize+1;*/
		this.startRow = ((pageNum*pageSize)/pageSize)*pageSize-pageSize+1;
		// 1*5 /5 = 1 *5 = 5 -5 = 0 
	}//pageNum ; pageSize; 
	public int getEndRow() {
		return endRow;//rowcount
	}
	public void setEndRow(int endRow) {
		
		this.endRow = (pageNum*blockSize>totalCount)? totalCount : ((pageNum*blockSize)/blockSize)*pageSize;
	}//1*5 /5 = 1 *5 =5-1 =4 
	public int getBlockSize() {
		return blockSize;
	}
	public void setBlockSize(int blockSize) {
		this.blockSize = blockSize;
	}
	public int getNowPage() {
		return pageNum;
	}
	public void setNowPage(int pageNum) {
		this.pageNum = pageNum;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getPageNum() {
		return pageNum;
	}
	public void setPageNum(int pageNum) {
		this.pageNum = pageNum;
	}

	}
