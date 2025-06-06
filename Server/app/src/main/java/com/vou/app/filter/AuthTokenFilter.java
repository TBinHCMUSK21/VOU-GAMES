package com.vou.app.filter;

import com.vou.app.model.auth.Token;
import com.vou.app.client.UserServiceClient;
import feign.FeignException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthTokenFilter extends OncePerRequestFilter {

    private final UserServiceClient userServiceClient;
    @Override
    protected void doFilterInternal(@NonNull final HttpServletRequest httpServletRequest,
                                    @NonNull final HttpServletResponse httpServletResponse,
                                    @NonNull final FilterChain filterChain) throws ServletException, IOException {

        log.debug("CustomBearerTokenAuthenticationFilter: Request received for URI: {}", httpServletRequest.getRequestURI());

        final String authorizationHeader = httpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

        if (Token.isBearerToken(authorizationHeader)) {
            final String jwt = Token.getJwt(authorizationHeader);
            log.debug("Token jwt", jwt);

            try {
                // Validate the token synchronously
                userServiceClient.validateToken(jwt);
                log.debug("Token validation succeeded for request: {}", httpServletRequest.getRequestURI());

                // Get the authentication object
                final UsernamePasswordAuthenticationToken authentication = userServiceClient.getAuthentication(jwt);

                // Store the JWT token as details for further reference
                authentication.setDetails(jwt);

                // Set authentication to SecurityContextHolder
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (FeignException e) {
                log.error("Token validation failed for request: {}", httpServletRequest.getRequestURI(), e);

                // Handle the error response
                if (e instanceof FeignException.Unauthorized || e instanceof FeignException.Forbidden) {
                    httpServletResponse.setStatus(HttpStatus.UNAUTHORIZED.value());
                } else {
                    httpServletResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
                }
                httpServletResponse.getWriter().write(e.getMessage());
            }
        } else {
            log.warn("Missing or invalid Authorization header for request: {}", httpServletRequest.getRequestURI());
        }

        // Proceed with the filter chain in any case
        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

}