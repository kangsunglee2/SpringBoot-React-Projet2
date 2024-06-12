package com.example.reactProject.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.reactProject.entity.React;

@Mapper
public interface ReactDao {

	@Select("select * from users where uid=#{uid} and isDeleted=0")
	React gerUserByUid(String uid);
	
	@Select("select * from users where isDeleted=0 order by regDate desc")
	List<React> getUserList();
	
	@Select("select count(uid) from users where isDeleted=0")
	int getUserCount();
}
