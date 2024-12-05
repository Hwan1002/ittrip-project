package project.map.security;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;


import lombok.extern.slf4j.Slf4j;
import project.map.entity.UserEntity;
import project.map.repository.UserRepository;

//DefaultOAuth2UserService
//시큐리티에서 기본으로 제공하는 OAuth2로그인시 사용자의 정보를 처리하는 서비스 클래스이다.
//OAuth2 인증이 성공하면 스프링 시큐리티는 이 클래스를 이용해 OAuth2 제공자(github)로부터 
//사용자의 정보를 가져오고, 이를 기반으로 어플리케이션에서 인증된 사용자 객체를 생성한다.
@Slf4j
@Service
public class OAuthUserServiceImpl extends DefaultOAuth2UserService {

	@Autowired
	private UserRepository repository;

	public OAuthUserServiceImpl() {
		super();
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		// DefaultOAuth2UserService의 기존 loadUser를 호출한다.
		// 이 메서드가 user-info-uri를 이용해 사용자 정보를 가져오는 부분이다.
		final OAuth2User oAuth2User = super.loadUser(userRequest);
		try {
			log.info("OAuth2User attributes {} ", new ObjectMapper().writeValueAsString(oAuth2User.getAttributes()));
		} catch (Exception e) {
			log.error("Error serializing OAuth2User attributes", e);
		}

		String userId = null;
		String profilePhoto = null;
		// 현재 사용자가 어떤 OAuth2 제공자를 통해 로그인했는지 이름을 반환한다.
	
		final String authProvider = userRequest.getClientRegistration().getClientName();
		
		if (authProvider.equals("naver")) {
	          // Naver에서 name을 가져오기 위해 'response' 필드를 찾습니다.
	           Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttributes().get("response");
	           if (response != null) {
	               userId = (String) response.get("id");  // 'response' 객체에서 'name' 추출
	               profilePhoto = (String) response.get("profile_image");
	           }
	      } else if (authProvider.equals("Kakao")) {
	         Map<String, Object> response = (Map<String, Object>) oAuth2User.getAttributes().get("properties");
	         Object id = oAuth2User.getAttributes().get("id");
	         userId = String.valueOf(id);
	          if (response != null) {
	                  profilePhoto = (String) response.get("profile_image");
	              }
	      } else {
	         userId = (String) oAuth2User.getAttributes().get("sub");
	          profilePhoto = (String) oAuth2User.getAttributes().get("picture");
	      }
		
		   if (!repository.existsById(userId)) {
	            repository.save(UserEntity.builder()
	                .id(userId)
	                .password("1234")
	                .authProvider(authProvider)
	                .profilePhoto(profilePhoto)
	                .build());
	        }

	      log.info("Successfully pulled user info username {} authProvider {} image {}", userId, authProvider,profilePhoto);
	      return new ApplicationOAuth2User(userId, oAuth2User.getAttributes());
	}
}