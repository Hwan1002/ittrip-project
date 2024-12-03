package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
	private String start;
	private String goal;
	private String waypoints;
	private int days;
	
	@OneToOne
	@JoinColumn(name="identifier", referencedColumnName="idx")
	private TripEntity trip;
}
