package project.map.entity;

import java.util.Date;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
@Entity
public class UserEntity {
	
	@Id
	@Column(name = "id", length = 255)
	private String id; // 회원아이디
	
	@Column(name = "`password`", nullable = false, length = 255)
	private String password; // 비밀번호
	
	@Column(name = "user_name", length = 20)
	private String userName ; // 이름
	
	@Column(name = "email", length = 50)
	private String email; // 이메일
	
	@Column(name = "address", length = 70)
	private String address; // 주소 
	
	@Column(name = "profile_photo", nullable = false, length = 255)
	private String profilePhoto; // 프로필사진
	
	@Transient //테이블에 매핑 되지 않음
	private String authProvider ; // 소셜로그인공급자 

	@CreationTimestamp
	@Column(name = "signup_date", nullable = false)
	private Date signupDate; // 회원가입 날짜 

}

