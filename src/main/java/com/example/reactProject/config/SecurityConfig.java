package com.example.reactProject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;

@Configuration
@EnableWebSecurity	
public class SecurityConfig {
	
	@Bean	// @Bean 주입되기 위해 사용
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(auth -> auth.disable())		// 괄호 안에 람다함수를 사용해야 함
			.headers(x -> x.frameOptions(y -> y.disable()))		// CK Editor image upload 때 필요
			.authorizeHttpRequests(auth -> auth
					.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
					.requestMatchers("user/register", "/react/**",
							"/img/**", "/css/**", "/js/**", "/error/**").permitAll()	//** 모든것들
					.requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")	// 어드민만 사용할수있는 목록
					.anyRequest().authenticated()
			);
		return http.build();
	}
}
