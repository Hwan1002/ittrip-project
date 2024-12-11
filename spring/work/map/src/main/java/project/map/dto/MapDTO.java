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
	private String startPlace;		//출발지 상호명
	private String startAddress;	//출발지 지번주소
	private String waypointsPoint;	//경유지 좌표들
	private String waypointsPlace;	//경유지 상호명들
	private String waypointsAddress;//경유지 지번주소들
	private String goalPoint;		//목적지 좌표
	private String goalPlace;		//목적지 장소
	private String goalAddress;		//목적지 지번주소
	private int days;				//일자
	private UserEntity user;			//UserEntity의 id
	private TripEntity trip;		//TripEntity의 title
	
	public MapDTO(MapEntity entity) {
	    this.idx = entity.getIdx(); // 맵 식별자
	    this.startPoint = entity.getStartPoint(); // 출발지 좌표
	    this.startPlace = entity.getStartPlace(); // 출발지 상호명
	    this.startAddress = entity.getStartAddress(); // 출발지 지번주소
	    this.waypointsPoint = entity.getWaypointsPoint(); // 경유지 좌표들
	    this.waypointsPlace = entity.getWaypointsPlace(); // 경유지 상호명들
	    this.waypointsAddress = entity.getWaypointsAddress(); // 경유지 지번주소들
	    this.goalPoint = entity.getGoalPoint(); // 목적지 좌표
	    this.goalPlace = entity.getGoalPlace(); // 목적지 장소
	    this.goalAddress = entity.getGoalAddress(); // 목적지 지번주소
	    this.days = entity.getDays(); // 일자
	    this.user = entity.getUser(); // UserEntity의 id
	    this.trip = entity.getTrip(); // TripEntity의 title
	}
	
//	public static MapDTO fromEntity(MapEntity entity) {
//        return MapDTO.builder()
//                .idx(entity.getIdx())
//                .startPoint(entity.getStartPoint())
//                .goalPoint(entity.getGoalPoint())
//                .waypointsPoint(entity.getWaypointsPoint())
//                .startPlace(entity.getStartPlace())
//                .goalPlace(entity.getGoalPlace())
//                .waypointsPlace(entity.getWaypointsPlace())
//                .days(entity.getDays())
//                .tripTitle(entity.getTrip() != null ? entity.getTrip().getTitle() : null)
//                .userId(entity.getUser() != null ? entity.getUser().getId().toString() : null)
//                .build();
//    }
	
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
