package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
	
	@Id
	private String signguCd;		//시군구코드
	private String areaCd;			//지역코드
	private String areaNm;			//지역이름 ex)인천광역시
	private String sigunguNm;		//시군구이름 ex)부평구
}
