package com.example.reactProject.service;

import java.util.List;

import com.example.reactProject.entity.React;


public interface ReactService {
	public static final int COUNT_PER_PAGE = 10;
	
	React getUserByUid(String uid);
	
	List<React> getUserList();
	
	int getUserCount();
}
