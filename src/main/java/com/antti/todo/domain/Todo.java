package com.antti.todo.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Todo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public long id;

	private String date;
	private String task;
	private String description;

	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Todo(String date, String task, String description) {
		super();
		this.date = date;
		this.task = task;
		this.description = description;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", date=" + date + ", task=" + task
				+ ", description=" + description + "]";
	}

}
