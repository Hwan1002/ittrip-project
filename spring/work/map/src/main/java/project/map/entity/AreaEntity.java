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
public class AreaEntity {
	
	@Id
	private String signguCd;
	private String areaCd;
	private String areaNm;
	private String sigunguNm;
}
