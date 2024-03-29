package com.commafeed.backend.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "USERS")
@SuppressWarnings("serial")
@Getter
@Setter
public class User extends AbstractModel {

	@Column(length = 32, nullable = false, unique = true)
	private String name;

	@Column(length = 255, unique = true)
	private String email;

	@Column(length = 256, nullable = false)
	private byte[] password;

	@Column(length = 40, unique = true)
	private String apiKey;

	@Column(length = 8, nullable = false)
	private byte[] salt;

	@Column(nullable = false)
	private boolean disabled;

	@Column
	private Instant lastLogin;

	@Column
	private Instant created;

	@Column(length = 40)
	private String recoverPasswordToken;

	@Column
	private Instant recoverPasswordTokenDate;
}
