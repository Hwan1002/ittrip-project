package project.map.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.MapEntity;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MapDTO {
	
	private String startPoint;		//출발지 좌표
	private String startPlace;		//출발지 지번주소
	private String waypointsPoint;	//경유지 좌표들
	private String waypointsPlace;	//경유지 지번주소들
	private String goalPoint;		//목적지 좌표
	private String goalPlace;		//목적지 장소
	private int days;				//일자
	private String userId;			//UserEntity의 id
	private String tripTitle;		//TripEntity의 title
	
	public MapDTO(MapEntity entity) {
		this.startPoint = entity.getStartPoint();
		this.startPoint = entity.getStartPlace();
		this.waypointsPoint = entity.getWaypointsPoint();
		this.waypointsPlace = entity.getWaypointsPlace();
		this.goalPoint = entity.getGoalPoint();
		this.goalPlace = entity.getGoalPlace();
		this.days = entity.getDays();
		this.userId = entity.getUser().getId();
		this.tripTitle = entity.getTrip().getTitle();
	}
	
	public static MapEntity toEntity(MapDTO dto) {
		return MapEntity.builder().
				startPoint(dto.getStartPoint()).
				startPlace(dto.getStartPlace()).
				waypointsPoint(dto.getWaypointsPoint()).
				waypointsPlace(dto.getWaypointsPlace()).
				goalPoint(dto.getGoalPoint()).
				goalPlace(dto.getGoalPlace()).
				days(dto.getDays()).
				build();
	}
}
