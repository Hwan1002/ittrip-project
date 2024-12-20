package project.map.dto;

import java.util.Arrays;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.dto.CheckListDTO.Items;
import project.map.entity.MapEntity;
import project.map.entity.TripEntity;
import project.map.entity.UserEntity;



@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MapDTO {
		private Integer idx;			//맵 식별자
		private String tripTitle;		//TripEntity의 title
		private String userId;
		private List<MapObject> mapObject;
		
		@Data
		@NoArgsConstructor
		@AllArgsConstructor
		public static class MapObject{
			private int days;
		    private String startPlace;
		    private String startAddress;
		    private String goalPlace;
		    private String goalAddress;
		    private List<WayPointDTO> wayPoints;

		}
		  
		@Data
		@NoArgsConstructor
		@AllArgsConstructor
	    public static class WayPointDTO {
	        private String id;
	        private String value;
	        private String address;
	    }
	    
		public MapDTO(MapEntity entity) {
			this.idx = entity.getIdx();
			this.userId = entity.getUser().getId();
			this.tripTitle = entity.getTrip().getTitle();
			
			this.mapObject = List.of(new MapObject(
			        entity.getDays(),
			        entity.getStartPlace(),
			        entity.getStartAddress(),
			        entity.getGoalPlace(),
			        entity.getGoalAddress(),
			        parseWaypoints(entity.getWaypoint())
					));
		}	       
			// waypoints를 String에서 List<WayPointDTO>로 변환하는 메서드
			private List<WayPointDTO> parseWaypoints(String waypoint) {
			    if (waypoint == null || waypoint.isEmpty()) {
			        return List.of(); // waypoint가 없으면 빈 리스트 반환
			    }

			    // 예: "id1:value1:address1,id2:value2:address2" 형식으로 가정하고 파싱
			    return Arrays.stream(waypoint.split("\\|"))
			        .map(entry -> {
			            String[] parts = entry.split(":"); // "id:value:address" 형식
			            if (parts.length == 3) {
			                return new WayPointDTO(parts[0], parts[1], parts[2]);
			            } else {
			                throw new IllegalArgumentException("Invalid waypoint format: " + entry);
			            }
			        })
			        .toList();
			    			 
	    }
	
}