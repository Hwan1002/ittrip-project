package project.map.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.CheckListEntity;
import project.map.entity.MapEntity;
import project.map.entity.TripEntity;
import project.map.entity.UserEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CheckListDTO {
	
	private Integer idx;		//체크리스트 식별자
	private String checkListString;	//체크리스트 배열을 직렬화해놓은 것
	private String[] checkListArray;
	private UserEntity user;		//UserEntity의 id
	private TripEntity trip;	//TripEntity의 title
	
	
	public CheckListDTO(CheckListEntity entity) {
		this.idx = entity.getIdx();
		this.checkListString = entity.getCheckList();
		this.user = entity.getUser();
		this.trip = entity.getTrip();
	}
	
//	public static CheckListDTO fromEntity(CheckListEntity entity) {
//        return CheckListDTO.builder()
//                .idx(entity.getIdx())
//                .checkList(entity.getCheckList())
//                .tripTitle(entity.getTrip() != null ? entity.getTrip().getTitle() : null)
//                .userId(entity.getUser() != null ? entity.getUser().getId().toString() : null)
//                .build();
//    }
	
	public CheckListEntity toEntity(UserEntity user, TripEntity trip) {
        return CheckListEntity.builder()
                .idx(this.idx)
                .checkList(this.checkListString)
                .user(user) // UserEntity 설정
                .trip(trip) // TripEntity 설정
                .build();
    }
}
