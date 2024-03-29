package com.commafeed.frontend.servlet;

import com.commafeed.backend.dao.UnitOfWork;
import com.commafeed.backend.dao.UserDAO;
import com.commafeed.backend.dao.UserSettingsDAO;
import com.commafeed.backend.model.UserSettings;

import jakarta.inject.Inject;

public class CustomCssServlet extends AbstractCustomCodeServlet {

	private static final long serialVersionUID = 1L;

	@Inject
	public CustomCssServlet(UnitOfWork unitOfWork, UserDAO userDAO, UserSettingsDAO userSettingsDAO) {
		super(unitOfWork, userDAO, userSettingsDAO);
	}

	@Override
	protected String getMimeType() {
		return "text/css";
	}

	@Override
	protected String getCustomCode(UserSettings settings) {
		return settings.getCustomCss();
	}

}
