package project.map.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.AreaEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AreaDTO {
	
	private String signguCd;
	private String areaCd;
	private String areaNm;
	private String sigunguNm;
	
	public AreaDTO(final AreaEntity entity) {
		this.signguCd = entity.getSignguCd();
		this.areaCd = entity.getAreaCd();
		this.areaNm = entity.getAreaNm();
		this.sigunguNm = entity.getSigunguNm();
	}
	
	public static AreaEntity toEntity(AreaDTO dto) {
		return AreaEntity.builder().
				signguCd(dto.getSignguCd()).
				areaCd(dto.getAreaCd()).
				areaNm(dto.getAreaNm()).
				sigunguNm(dto.getSigunguNm()).
				build();
	}
}
