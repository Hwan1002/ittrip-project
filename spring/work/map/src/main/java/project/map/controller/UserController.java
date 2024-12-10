package project.map.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import project.map.dto.ResponseDTO;
import project.map.dto.UserDTO;
import project.map.security.TokenProvider;
import project.map.service.UserService;

@RequestMapping
@RestController
public class UserController {

	@Autowired
	private UserService service;

	@Autowired
	private TokenProvider tokenProvider;

	@GetMapping("/userinfo")
	public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authorization) {	
		if (authorization == null || !authorization.startsWith("Bearer ")) {
			return ResponseEntity.status(400).body("Bad Request: Invalid Authorization header");
		}
		String token = authorization.substring(7);
		// 토큰을 검증하고 사용자 ID를 추출
		String userId = tokenProvider.validateAndGetUserId(token);
		// 사용자 정보를 DB에서 가져오기
		UserDTO user = service.getById(userId);

		if (user != null) {
			ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().value(user).build();
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(404).body("User not found");
		}
	}

	// 회원가입
	@PostMapping(value = "/signup", consumes = "multipart/form-data")
	public ResponseEntity<?> registerUser(@RequestParam("id") String id, 
										@RequestParam("password") String password,
										@RequestParam("userName") String userName, 
										@RequestParam("email") String email,
										@RequestParam("profilePhoto") MultipartFile profilePhoto) {
		// DTO 객체 생성
		UserDTO dto = new UserDTO(id, password, userName, email, null);
		// profilePhoto 처리
		UserDTO registerUser = service.create(dto, profilePhoto);
		ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().value(registerUser).build();
		return ResponseEntity.ok(response);
	}

	// 로그인
	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserDTO dto) {
		UserDTO user = service.getByCredentials(dto.getId(), dto.getPassword());
		if (user != null) {

			ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().value(user).build();
			return ResponseEntity.ok(response);

		} else {
			ResponseDTO responseDTO = ResponseDTO.builder().error("Login failed").build();
			return ResponseEntity.badRequest().body(responseDTO);

		}

	}

	// 중복체크
	@PostMapping("/check")
	public ResponseEntity<?> duplicate(@RequestBody UserDTO dto) {
		return ResponseEntity.ok(service.duplicate(dto.getId()));
	}

	// 회원정보 수정
	@PutMapping
	public ResponseEntity<?> modify(@AuthenticationPrincipal String userId, 
										@RequestParam("id") String id, 
										@RequestParam("password") String password,
										@RequestParam("userName") String userName, 
										@RequestParam("email") String email,
										@RequestParam("profilePhoto") MultipartFile profilePhoto) {
		// DTO 객체 생성
		UserDTO dto = new UserDTO(id, password, userName, email, null);
		service.modify(dto.getId(), dto, profilePhoto);
		return ResponseEntity.ok("회원정보 수정완료");

	}
<<<<<<< Updated upstream

=======
	
	
>>>>>>> Stashed changes
	// 회원정보 삭제
	@DeleteMapping
	public ResponseEntity<?> delete(@AuthenticationPrincipal String userId) {
		service.delete(userId);
		return ResponseEntity.ok("회원삭제완료");

	}

}
