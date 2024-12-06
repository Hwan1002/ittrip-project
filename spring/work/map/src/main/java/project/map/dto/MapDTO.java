package project.map.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.MapEntity;
import project.map.entity.TripEntity;
import project.map.entity.UserEntity;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MapDTO {
	
	private Integer idx;			//맵 식별자
	private String startPoint;		//출발지 좌표
	private String startPlace;		//출발지 지번주소
	private String waypointsPoint;	//경유지 좌표들
	private String waypointsPlace;	//경유지 지번주소들
	private String goalPoint;		//목적지 좌표
	private String goalPlace;		//목적지 장소
	private int days;				//일자
	private String userId;			//UserEntity의 id
	private String tripTitle;		//TripEntity의 title
	
	public static MapDTO fromEntity(MapEntity entity) {
        return MapDTO.builder()
                .idx(entity.getIdx())
                .startPoint(entity.getStartPoint())
                .goalPoint(entity.getGoalPoint())
                .waypointsPoint(entity.getWaypointsPoint())
                .startPlace(entity.getStartPlace())
                .goalPlace(entity.getGoalPlace())
                .waypointsPlace(entity.getWaypointsPlace())
                .days(entity.getDays())
                .tripTitle(entity.getTrip() != null ? entity.getTrip().getTitle() : null)
                .userId(entity.getUser() != null ? entity.getUser().getId().toString() : null)
                .build();
    }
	
	public MapEntity toEntity(UserEntity user, TripEntity trip) {
        return MapEntity.builder()
                .idx(this.idx)
                .startPoint(this.startPoint)
                .goalPoint(this.goalPoint)
                .waypointsPoint(this.waypointsPoint)
                .startPlace(this.startPlace)
                .goalPlace(this.goalPlace)
                .waypointsPlace(this.waypointsPlace)
                .days(this.days)
                .user(user) // UserEntity 설정
                .trip(trip) // TripEntity 설정
                .build();
    }
}
