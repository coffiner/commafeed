package com.commafeed.frontend.model.request;

import java.io.Serializable;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@SuppressWarnings("serial")
@Data
@Schema
public class LoginRequest implements Serializable {

	@Schema(description = "username", requiredMode = RequiredMode.REQUIRED)
	@Size(min = 3, max = 32)
	private String name;

	@Schema(description = "password", requiredMode = RequiredMode.REQUIRED)
	@NotEmpty
	@Size(max = 128)
	private String password;
}
