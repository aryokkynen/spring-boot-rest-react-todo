package com.antti.todo.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.antti.todo.domain.TodoRepository;

@Controller
public class TodoController {

	@Autowired
	TodoRepository repository;
	
    @RequestMapping(value="/login")
	public String login() {
		return "login";
	} 
    
    /*
    @RequestMapping(value = "/")
    public String reactStart() {
        return "index.html";
    }
    */   
}
