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
			
			// Create users: admin/antti user/antti
			User user1 = new User("user", "$2a$10$IgxpWZ74wcFC3aCwvzW1Se9H.hs6eazWzv7.nrDMnT8Q0/9zG.k.a", "USER");
			User user2 = new User("admin", "$2a$10$IgxpWZ74wcFC3aCwvzW1Se9H.hs6eazWzv7.nrDMnT8Q0/9zG.k.a", "ADMIN");
			urepository.save(user1);
			urepository.save(user2);

			
			
			Todo task6 = new Todo("2017-05-16", "Demo", "Show this");
			Todo task5 = new Todo("2017-05-15", "To-do list", "List is still broken!");
			Todo task4 = new Todo("2017-05-05", "Start working on project", "Be productive");
			Todo task3 = new Todo("2017-04-15", "Deployment of new webapp", "Wish your Q/A test were good enough");
			Todo task2 = new Todo("2017-04-12", "Test new webapp", "Do QA testing for new website, report bugs");
			Todo task1 = new Todo("2016-12-28", "Fix stuff", "To-do list is still broken");
			
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