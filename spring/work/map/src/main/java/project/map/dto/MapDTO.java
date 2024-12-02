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
	
	private String start;
	private String waypoints;
	private String goal;
	private int days;
	
	public MapDTO(MapEntity entity) {
		this.start = entity.getStart();
		this.waypoints = entity.getWaypoints();
		this.goal = entity.getGoal();
		this.days = entity.getDays();
	}
	
	public static MapEntity toEntity(MapDTO dto) {
		return MapEntity.builder().
				start(dto.getStart()).
				waypoints(dto.getWaypoints()).
				goal(dto.getGoal()).
				days(dto.getDays()).
				build();
	}
}
