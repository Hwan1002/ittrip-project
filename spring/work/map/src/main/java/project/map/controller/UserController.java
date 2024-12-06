package project.map.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;
import project.map.dto.ResponseDTO;
import project.map.dto.UserDTO;
import project.map.service.UserService;

@RequestMapping
@Slf4j
@RestController
public class UserController {

	@Autowired
	private UserService service;

	// 유저전체 조회
	@GetMapping
	public ResponseEntity<?> retrieve() {
		List<UserDTO> dtos = service.getAll();
		ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}

	// id를 이용한 1명 유저 조회
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable String userId) {
		try {
			UserDTO user = service.getById(userId);
			ResponseDTO<UserDTO> response = ResponseDTO.<UserDTO>builder().value(user).build();
			return ResponseEntity.ok(response);
		} catch (RuntimeException e) {
			ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
			return ResponseEntity.badRequest().body(responseDTO);
		}
	}

	// 회원가입
	@PostMapping(value = "/signup", consumes = "multipart/form-data")
	public ResponseEntity<?> registerUser(@RequestParam("id") String id, 
											@RequestParam("password") String password,
											@RequestParam("userName") String userName,
											@RequestParam("email") String email,
											@RequestParam("address") String address, 
											@RequestParam("profilePhoto") MultipartFile profilePhoto) {
		// DTO 객체 생성
		UserDTO dto = new UserDTO(id, password, userName, email, address, null);
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
	public ResponseEntity<?> modify(@AuthenticationPrincipal String userId, @RequestBody UserDTO dto) {
		service.modify(dto.getId(), dto);
		return ResponseEntity.ok("회원정보 수정완료");

	}

	// 회원정보 삭제
	@DeleteMapping
	public ResponseEntity<?> delete(@AuthenticationPrincipal String userId) {
		service.delete(userId);
		return ResponseEntity.ok("회원삭제완료");

	}

}
