package com.bitcamp.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Member;
import com.bitcamp.web.domain.Page;
import com.bitcamp.web.mapper.Mapper;
import com.bitcamp.web.service.ICountService;
import com.bitcamp.web.service.IGetService;
import com.bitcamp.web.util.PageAdapter;

@RestController
public class Controller {
  private static final Logger logger = LoggerFactory.getLogger(Controller.class);
  @Autowired Mapper mapper;
  @Autowired Command cmd;
  @Autowired Member member;
  @Autowired Page page;
  @Autowired PageAdapter adapter;
  @RequestMapping(value="/members/{id}/login", 
		  		  method=RequestMethod.POST,
		  		  consumes="application/json")
  public Map<?,?> getUserId(
		  @PathVariable String id,
		  @RequestBody Member m) {
    Map<String, Object> map = new HashMap<>();
    logger.info("Welecom to {}", "Member!!");
    logger.info("ID {}", m.getId());
    logger.info("PASS {}", m.getPass());
    cmd = new Command();
    cmd.setData1(m.getId());
    cmd.setData2(m.getPass());
    int count = new ICountService() {
      @Override
      public int execute(Command cmd) {
        return mapper.exist(cmd);
      }
    }.execute(cmd);
    logger.info("count : {}", ""+count);
    map.put("success", ""+count);
    if(count == 1) {
      Member m2 = (Member) new IGetService() {
        @Override
        public Object execute(Command cmd) {
          return mapper.selectMemberById(cmd);
        }
      }.execute(cmd);
      map.put("user", m2);
    }
    return map;
  }
  @RequestMapping("/articles/{pageNum}")
  public Map<?,?> getArticles(
		  @PathVariable String pageNum) {
		Map<String,Object> map = new HashMap<>();
		page.setTotalCount(new ICountService() {
			
			@Override
			public int execute(Command cmd) {
				System.out.println("토탈카운터1 : "+mapper.existArticle(cmd));
				return mapper.existArticle(cmd);
			}
		}.execute(cmd));
		page.setPageNum(Integer.parseInt(pageNum));
		page.setBlockSize(5);
		page.setPageSize(5);
		page = (Page) adapter.attr(page);
		cmd.setData3(page.getStartRow());
		cmd.setData4(page.getEndRow());
		
		System.out.println("토탈카운터2 : "+mapper.existArticle(cmd));
		map.put("list", (List<?>) new IGetService() {
			@Override
			public Object execute(Command cmd) {
				
				return mapper.articles(cmd);
			}
			}.execute(cmd));	
		map.put("page",page);
		System.out.println("map : "+map);
		return map;
  }
  @RequestMapping(value="/articles",
	  			 method = RequestMethod.GET,
	  			 consumes="application/json")
  		public Map<?,?> putArticles(
			@PathVariable String seq) {
  		Map<String,Object>map = new HashMap<>();
  			return map;
}
}