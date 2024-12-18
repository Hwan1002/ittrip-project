package project.map.dto;

import java.util.List;

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


	private Integer idx; // 체크리스트 식별자
	private String checkList; // 체크리스트 배열을 직렬화해놓은 것
	private String userId; // UserEntity의 id
	private String tripTitle; // TripEntity의 title
	private Boolean checked;

}
