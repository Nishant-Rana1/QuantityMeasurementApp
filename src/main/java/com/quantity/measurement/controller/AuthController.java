package com.quantity.measurement.controller;

import com.quantity.measurement.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;

    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/login")
    public String login() {
        return "Open /oauth2/authorization/google";
    }

    @GetMapping("/success")
    public void success(
            @AuthenticationPrincipal OAuth2User user,
            HttpServletResponse response
    ) throws IOException {

        String email = user.getAttribute("email");
        String name = user.getAttribute("name");
        String picture = user.getAttribute("picture");
        String token = jwtUtil.generateToken(email);

        // Create cookies to share with the frontend
        Cookie tokenCookie = new Cookie("mp_token", token);
        tokenCookie.setPath("/");
        tokenCookie.setMaxAge(3600); // 1 hour
        response.addCookie(tokenCookie);

        if (name != null) {
            Cookie nameCookie = new Cookie("mp_name", URLEncoder.encode(name, StandardCharsets.UTF_8.toString()));
            nameCookie.setPath("/");
            nameCookie.setMaxAge(3600);
            response.addCookie(nameCookie);
        }

        if (email != null) {
            Cookie emailCookie = new Cookie("mp_email", email);
            emailCookie.setPath("/");
            emailCookie.setMaxAge(3600);
            response.addCookie(emailCookie);
        }

        if (picture != null) {
            Cookie picCookie = new Cookie("mp_picture", URLEncoder.encode(picture, StandardCharsets.UTF_8.toString()));
            picCookie.setPath("/");
            picCookie.setMaxAge(3600);
            response.addCookie(picCookie);
        }

        // Redirect back to the home page (where frontend is served)
        response.sendRedirect("/");
    }
}
