package project.map.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import project.map.entity.UserEntity;

@Service
public class TokenProvider {
	private static final String SECRET_KEY ="eyJhbGciOiJIUzUxMiJ9eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNzk3NzQ2OSwiaWF0IjoxNzI3OTc3NDY5fQ3WUk1X983GsejnQZJSNQKjZBfBeSzOK4cAxpndz0G3pSItFPDiDVnSfD0ZsQzVCSkSMKQozyMVDjt9VYTcJw";
	
	   public String create(UserEntity entity) {

	      Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));

	      return Jwts.builder()
	    		.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
	            .setSubject(entity.getUserId())
	            .setIssuer("demo app") 
	            .setIssuedAt(new Date())
	            .setExpiration(expiryDate) 
	            .compact(); 

	   }
	   
	   
	   public String create(Authentication authentication) {

	      ApplicationOAuth2User userPrincipal = (ApplicationOAuth2User)authentication.getPrincipal();
	      Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));


	      return Jwts.builder().signWith(SignatureAlgorithm.HS512, SECRET_KEY)
	            .setSubject(userPrincipal.getName()) //id가 반환됨
	            .setIssuer("demo app") // 토큰 발행 주체
	            .setIssuedAt(new Date()) // 토큰 발행 날짜
	            .setExpiration(expiryDate) // exp
	            .compact(); // 토큰을 . 으로 구분된 하나의 문자열로 만들어준다

	   }

	   
	   
	   
	   // 토큰을 받아서 검증을 하는 메서드
	   public String validateAndGetUserId(String token) {
	      Claims claims = Jwts.parser()
	            // 토큰을 생성할 때 사용했던 서명키
	            .setSigningKey(SECRET_KEY)
	            // JWT 토큰을 파싱하고, 서명을 검증한다.
	            // 이 메서드는 토큰이 유효한지 확인하고, 올바른 서명으로
	            // 서명이 되었는지 검증한다.
	            // 서명이 유효하지 않거나 토큰이 만료된 경우, 예외가 발생
	            .parseClaimsJws(token)
	            // 페이로드 부분을 반환한다.
	            // 여기에는 주체, 발행자, 만료시간, 발행시간 등
	            // 여러가지 필드가 있을 수 있다.
	            .getBody();

	      // getSubject()
	      // claims객체에서 주체를 가져온다.
	      // 주로 사용자의 id나 이름같은 식별자를 나타낸다.
	      // 이 값은 JWT를 발급할 때 설정된 것이다.
	      return claims.getSubject();

	   }
	}
