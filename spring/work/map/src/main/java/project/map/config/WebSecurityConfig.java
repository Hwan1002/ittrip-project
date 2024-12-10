package project.map.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import project.map.security.JwtAuthenticationFilter;
import project.map.security.OAuthSuccessHandler;
import project.map.security.OAuthUserServiceImpl;
import project.map.security.RedirectUrlCookieFilter;





@Configuration
@EnableWebSecurity
public class WebSecurityConfig implements WebMvcConfigurer {
   
   @Autowired
   private JwtAuthenticationFilter jwtAuthenticationFilter;
   
   @Autowired
   private OAuthUserServiceImpl oAuthUserService;
   
   @Autowired
   private OAuthSuccessHandler oAuthSuccessHandler;
   
   @Autowired
   private RedirectUrlCookieFilter redirectUrlCookieFilter;
   
   @Bean
   protected DefaultSecurityFilterChain securityFilterChain(
         HttpSecurity http) throws Exception {

      http
         .cors(corsConfigurer -> corsConfigurer.configurationSource(corsConfigurationSource()))
         .csrf(csrfConfigurer -> csrfConfigurer.disable())
         .httpBasic(httpBasicConfigurer -> httpBasicConfigurer.disable())
         .sessionManagement(sessionManagementConfigurer ->
               sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
           )
         
         .authorizeHttpRequests(authorizeRequestsConfigurer -> 
            authorizeRequestsConfigurer
            .requestMatchers("/","/**", "/auth/**","/oauth2/**").permitAll()
            .anyRequest().authenticated()
         ) 
         .oauth2Login()
         .redirectionEndpoint()
         .baseUri("/login/oauth2/code/*")
         .and()
         .authorizationEndpoint()
         .baseUri("/auth/authorize")
         .and()
         .userInfoEndpoint()
         .userService(oAuthUserService)
         .and()
         .successHandler(oAuthSuccessHandler)  
         .and()
         .exceptionHandling()
         .authenticationEntryPoint(new Http403ForbiddenEntryPoint());

      http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
      http.addFilterAfter(redirectUrlCookieFilter, OAuth2AuthorizationRequestRedirectFilter.class);
      
      
      return http.build();
   }

	//CORS오류가 발생할 시 WebMvcConfig를 삭제하고 아래에 직접 Bean으로 만들기
   @Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000")); // 프론트엔드 주소
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(true);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
   
   
   @Override
   public void addResourceHandlers(ResourceHandlerRegistry registry) {
      registry.addResourceHandler("/uploads/**")
              .addResourceLocations("file:uploads/"); // 파일 시스템에서 'uploads' 디렉토리의 파일을 서빙
   }
}
