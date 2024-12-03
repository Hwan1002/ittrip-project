package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class MapEntity {
	
	@Id
	private String identifier;
	
	private String start;			//출발지
	private String goal;			//목적지
	private String waypoints;		//경유지
	private int days;				//일자
	
	@OneToOne
	@JoinColumn(name = "trip_idx",referencedColumnName="idx")
	@MapsId("identifier")
    private TripEntity trip;
}
