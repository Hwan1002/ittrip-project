package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity		
public class AreaEntity {		//공공데이터 관련 엔티티
	
	//필수 요청 파라미터들
	@Id
	private String signguCd;		//시군구코드
	private String areaCd;			//지역코드
	private String areaNm;			//지역이름 ex)인천광역시
	private String sigunguNm;		//시군구이름 ex)부평구
	
//	@OneToOne		//user테이블의 주소를 외래키로 가져옴 (관계 = 1:1)
//	@JoinColumn(name="user_address",referencedColumnName="address")
//	private UserEntity user;
}
