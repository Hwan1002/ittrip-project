package project.map.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import project.map.dto.UserDTO;
import project.map.entity.UserEntity;
import project.map.repository.UserRepository;
import project.map.security.TokenProvider;

@Service
@Slf4j
public class UserService {

	@Autowired
	private UserRepository repository;

	@Autowired
	private TokenProvider tokenProvider;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	// 유저 전체조회
	public List<UserDTO> getAll() {
		List<UserEntity> entities = repository.findAll();
		List<UserDTO> dtos = entities.stream().map(UserDTO::new).collect(Collectors.toList());
		return dtos;
	}

	// 유저 생성
	public UserDTO create(UserDTO dto) {
		try {
			// 필수 필드 검증
			if (dto.getId() == null || dto.getPassword() == null || dto.getUserName() == null || dto.getEmail() == null
					|| dto.getAddress() == null) {
				throw new IllegalArgumentException("모든 필드는 null이 될 수 없습니다. 필수 값을 확인해주세요.");
			}
			// UserEntity 빌드
			UserEntity entity = toEntity(dto);
			final String userId = entity.getId();
			if (repository.existsById(userId)) {
				log.warn("UserId already exist {}", userId);
				throw new RuntimeException("UserName alredy exist");
			}
			// 엔티티 저장
			repository.save(entity);
			return toDTO(entity);
		} catch (Exception e) {
			// 예외 발생 시 로그를 남기고 사용자 정의 예외를 던짐
			throw new RuntimeException("유저 생성에 실패했습니다: " + e.getMessage(), e);
		}
	}

	// signin을 위한 userId , password 검증
	public UserDTO getByCredentials(String userId, String password) {
		UserEntity entity = repository.findById(userId).get();
		if (entity != null && passwordEncoder.matches(password, entity.getPassword())) {
			final String token = tokenProvider.create(entity);
			UserDTO dto = toDTO(entity);
			dto.setToken(token);
			return dto;
		} else {
			throw new RuntimeException("아이디 또는 비밀번호가 일치하지 않습니다 .");
		}

	}

	// 회원정보 수정 ////비밀번호 , 주소 ,프로필사진
	@Transactional
	public void modify(String id, UserDTO dto) {
		UserEntity entity = repository.findById(id).get();
		// 수정 후 password 인코딩 빠져있어서 추가 .
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));

		entity.setAddress(dto.getAddress());
		entity.setProfilePhoto(dto.getProfilePhoto());
		repository.save(entity);

	}

	// 회원 삭제
	@Transactional
	public void delete(String id) {
		UserEntity entity = repository.findById(id).get();
		repository.delete(entity);
	}

	// 중복체크
	public boolean duplicate(String id) {
		if (repository.existsById(id)) {
			return true;
		}
		return false;
	}

	// dto -> entity
	public UserEntity toEntity(UserDTO dto) {
		return UserEntity.builder().id(dto.getId()).password(passwordEncoder.encode(dto.getPassword())) // 비밀번호 암호화
				.userName(dto.getUserName()).email(dto.getEmail()).address(dto.getAddress())
				.profilePhoto(dto.getProfilePhoto()).build();
	}

	// entity -> dto
	public UserDTO toDTO(UserEntity entity) {

		return UserDTO.builder().id(entity.getId()).userName(entity.getUserName()).email(entity.getEmail())
				.signupDate(entity.getSignupDate()).address(entity.getAddress()).profilePhoto(entity.getProfilePhoto())
				.build();
	}

}