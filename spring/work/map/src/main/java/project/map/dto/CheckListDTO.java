package project.map.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.CheckListEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CheckListDTO {
	
	private String checkList;	//체크리스트 배열을 직렬화해놓은 것
	private String userId;		//UserEntity의 id
	private String tripTitle;	//TripEntity의 title
	
	public CheckListDTO(final CheckListEntity entity) {
		this.checkList = entity.getCheckList();
	}
	
	public static CheckListEntity toEntity(CheckListDTO dto) {
		return CheckListEntity.
				builder().
				checkList(dto.getCheckList())
				.build();
	}
}
