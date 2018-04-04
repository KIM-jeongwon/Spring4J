package com.bitcamp.web.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.bitcamp.web.domain.Admin;
import com.bitcamp.web.domain.Board;
import com.bitcamp.web.domain.Command;
import com.bitcamp.web.domain.Image;
import com.bitcamp.web.domain.Member;
import com.bitcamp.web.domain.Page;
import com.bitcamp.web.mapper.Mapper;
import com.bitcamp.web.service.ICountService;
import com.bitcamp.web.service.IGetService;
import com.bitcamp.web.service.ISearchService;
import com.bitcamp.web.util.FileProxy;
import com.bitcamp.web.util.ImageRepo;
import com.bitcamp.web.util.PageAdapter;


@RestController
public class Controller {
  private static final Logger logger = LoggerFactory.getLogger(Controller.class);
  @Autowired Mapper mapper;
  @Autowired Command cmd;
  @Autowired Member member;
  @Autowired Page page;
  @Autowired PageAdapter adapter;
  @Autowired Image image;
  
  
  @RequestMapping("/search/{keyword}")
  public Object searchOne(
		  @PathVariable("keyword") String keyword,
		  @RequestBody HashMap<String,String> param){
	  Object o = null;
	switch (param.get("type")) {
	case "member":
		o= new ISearchService() {
			
			@Override
			public Object execute(HashMap<?,?> param) {
				// TODO Auto-generated method stub
				return mapper.searchMemberById(param);
			}
		}.execute(param);
	case "admin":
		o =new ISearchService() {
			
			@Override
			public Object execute(HashMap<?,?> param) {
				// TODO Auto-generated method stub
				return mapper.searchMemberById(param);
			}
		}.execute(param);
	default:
		break;
	}
	return o;
  }
  
  
  @RequestMapping(value="/{type}/{id}/login", 
		  		  method=RequestMethod.POST,
		  		  consumes="application/json")
  public Map<?,?> login(
		  @PathVariable String type,
		  @PathVariable String id,
		  @RequestBody Member m) {
    Map<String, Object> map = new HashMap<>();
    logger.info("Welecom to {}", "Member!!");
    logger.info("ID {}", m.getId());
    logger.info("PASS {}", m.getPass());
    cmd = new Command();
    cmd.setType(type);
    switch (type) {
	case "member":
		  cmd.setId("id");
		  cmd.setPass("pass");
		break;
	case "admin":
		 cmd.setId("adm_id");
		 cmd.setPass("adm_pass");
		break;
	default:
		break;
	}
    cmd.setData1(m.getId());
    cmd.setData2(m.getPass());
    int count = 0;

    count = new ICountService() {
	      @Override
	      public int execute(Command cmd) {
	        return mapper.exist(cmd);
	      }
	    }.execute(cmd);
	    logger.info("count : {}", ""+count);
	    map.put("success", ""+count);
	   if(count == 1 && type.equals("member")) {
	      Member m2 = (Member) new IGetService() {
	        @Override
	        public Object execute(Command cmd) {
	          return mapper.selectMemberById(cmd);
	        }
	      }.execute(cmd);
	      map.put("member", m2);
	      System.out.println("로그인성공여부"+count);
   
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
  @RequestMapping(value="/board/post/articles",
			 method = RequestMethod.POST,
			 consumes="application/json")
	public Map<?,?> postArticle(
			/*@PathVariable String id,
			@PathVariable String title,
			@PathVariable String content,*/
			  @RequestBody Board b) {
	Map<String,Object>map = new HashMap<>();
	System.out.println("넘어온 ID : "+b.getId());
	System.out.println("넘어온 글제목 : "+b.getTitle());
	System.out.println("넘어온 글내용 : "+b.getContent());
		return map;
}
  @RequestMapping(value="/board/file/upload" ,method=RequestMethod.POST)
	public Map<?,?> upload(
				MultipartHttpServletRequest request,
				HttpSession session
			) 
			throws IllegalStateException, IOException {
	  	Map<String,Object> map = new HashMap<>();
	  	FileProxy pxy = new FileProxy();
	  	Iterator<String> it = request.getFileNames();
	  	if(it.hasNext()) {
	  		MultipartFile file = request.getFile(it.next());
	  		String rootPath = request.getSession().getServletContext().getRealPath("/");
	  		String uploadPath = "resources/image/";
	  		String filename = file.getOriginalFilename();
	  		System.out.println("파일네임"+filename);
	  		image.setImageID(new SimpleDateFormat("yyyyMMdd_hhmm_").format(new Date())+filename);
	  		image.setFilename(filename);
	  		
	  	}
	  	/*List<MultipartFile> files = file.getFiles();*/
	  	System.out.println("/board/upload/컨트롤러진입");
		String fileName = pxy.getFile().getOriginalFilename();
		
		System.out.println("업로드된 파일 : "+fileName);
		String path = 
				ImageRepo.UPLOAD_PATH.toString()+ fileName;
		
		File file = new File(path);
		
		pxy.getFile().transferTo(file);

		return map;
	}


}