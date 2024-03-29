package com.commafeed.frontend.ws;

import java.util.Optional;

import com.commafeed.frontend.session.SessionHelper;

import jakarta.inject.Inject;
import jakarta.inject.Singleton;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpointConfig;
import jakarta.websocket.server.ServerEndpointConfig.Configurator;
import lombok.RequiredArgsConstructor;

@Singleton
@RequiredArgsConstructor(onConstructor = @__({ @Inject }))
public class WebSocketConfigurator extends Configurator {

	public static final String SESSIONKEY_USERID = "userId";

	private final WebSocketSessions webSocketSessions;

	@Override
	public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
		HttpSession httpSession = (HttpSession) request.getHttpSession();
		if (httpSession != null) {
			Optional<Long> userId = SessionHelper.getLoggedInUserId(httpSession);
			userId.ifPresent(value -> config.getUserProperties().put(SESSIONKEY_USERID, value));
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public <T> T getEndpointInstance(Class<T> endpointClass) {
		return (T) new WebSocketEndpoint(webSocketSessions);
	}
}
