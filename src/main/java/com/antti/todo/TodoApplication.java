package com.antti.todo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.antti.todo.domain.Todo;
import com.antti.todo.domain.TodoRepository;
import com.antti.todo.domain.User;
import com.antti.todo.domain.UserRepository;

@SpringBootApplication
public class TodoApplication {

	private static final Logger log = LoggerFactory
			.getLogger(TodoApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(TodoRepository repository, UserRepository urepository) {
		return (args) -> {
			log.info("Commandline works?");
			
			// Create users: admin/admin user/user
			User user1 = new User("user", "$2a$06$3jYRJrg0ghaaypjZ/.g4SethoeA51ph3UD4kZi9oPkeMTpjKU5uo6", "USER");
			User user2 = new User("admin", "$2a$10$0MMwY.IQqpsVc1jC8u7IJ.2rT8b0Cd3b3sfIBGV2zfgnPGtT4r0.C", "ADMIN");
			urepository.save(user1);
			urepository.save(user2);

			
			
			Todo task1 = new Todo("04/04/2017", "Fix stuff", "Todolist is still broken");
			Todo task2 = new Todo("04/03/2017", "Fix stuff", "Todolist is still broken");
			Todo task3 = new Todo("04/02/2017", "Fix stuff", "Todolist is still broken");
			Todo task4 = new Todo("03/29/2017", "Fix stuff", "Todolist is still broken");
			Todo task5 = new Todo("01/01/2017", "Fix stuff", "Todolist is still broken");
			Todo task6 = new Todo("12/28/2016", "Fix stuff", "Todolist is still broken");
			
			repository.save(task1);
			repository.save(task2);
			repository.save(task3);
			repository.save(task4);
			repository.save(task5);
			repository.save(task6);


			log.info("Tasks found with findAll():");
			log.info("-------------------------------");
			for (Todo todo : repository.findAll()) {
				log.info(todo.toString());
			}
			log.info("-------------------------------");
			
			log.info("Users found with findAll():");
			log.info("-------------------------------");
			for (User user : urepository.findAll()) {
				log.info(user.toString());
			}
			log.info("-------------------------------");
			
			
			
		};

	}
}