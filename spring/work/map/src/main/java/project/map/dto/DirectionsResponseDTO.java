package project.map.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DirectionsResponseDTO {

	private Route route ;

	@Data
	public static class Route{
		private  List<Traoptimal> traoptimal ;
	}
	
	@Data
	public static class Traoptimal{
		private Summary summary ;
		private List<List<Double>> path ;
	}
	
	@Data
	public static class Summary{
		private Integer distance;
		private Integer duration;
		private Integer tollFare;
		private Integer fuelPrice;
		
	}
	 
	
}