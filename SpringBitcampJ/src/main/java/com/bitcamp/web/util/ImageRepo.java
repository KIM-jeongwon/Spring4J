package com.bitcamp.web.util;

import java.io.File;

public enum ImageRepo {
	UPLOAD_PATH{

		@Override
		public String toString() {
			// TODO Auto-generated method stub
			return "C:"+File.separator
				  +"Users"+File.separator
				  +"1027"+File.separator
				  +"git"+File.separator
				  +"SpringBitcamp"+File.separator
				  +"bitcamp"+File.separator
				  +"src"+File.separator
				  +"main"+File.separator
				  +"webapp"+File.separator
				  +"resources"+File.separator
				  +"img"+File.separator
				  +"/";
		}
		
	}
}
