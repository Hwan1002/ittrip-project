package project.map.dto;

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
		private String userId;			//UserEntity의 id
		private String tripTitle;		//TripEntity의 title
		
		private List<MapObject> mapObject;
		
		@NoArgsConstructor
		@AllArgsConstructor
		@Data
		public static class MapObject{
			private int days;
		    private String startPlace;
		    private String startAddress;
		    private String goalPlace;
		    private String goalAddress;
		    private List<WayPointDTO> wayPoints;

		}
		  
		@AllArgsConstructor
	    @NoArgsConstructor
	    @Data
	    public static class WayPointDTO {
	        private String id;
	        private String value;
	        private String address;
	    }
	    
//		public MapObject(MapEntity entity) {
//			 this.startPlace = entity.getStartPlace(); // 출발지 상호명
//			 this.startAddress = entity.getStartAddress(); // 출발지 지번주소
//			 this.waypointsPlace = entity.getWaypointsPlace(); // 경유지 상호명들
//			 this.waypointsAddress = entity.getWaypointsAddress(); // 경유지 지번주소들
//			 this.goalPlace = entity.getGoalPlace(); // 목적지 장소
//			 this.goalAddress = entity.getGoalAddress(); // 목적지 지번주소
//			 this.days = entity.getDays(); // 일자
//	    }
	
	
	
	
	
	
	
	
	public MapDTO(MapEntity entity) {
	    this.idx = entity.getIdx(); // 맵 식별자
	    this.userId = entity.getUser().getId(); // UserEntity의 id
	    this.tripTitle = entity.getTrip().getTitle(); // TripEntity의 title
	}
	

	
	
}
