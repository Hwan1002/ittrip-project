package project.map.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "MAP")
@Entity
public class MapEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
    private Integer idx; // Primary Key
	
	@Column(name = "start", nullable = false , length = 30)
    private String start;   // 출발지
	
	@Column(name = "goal", nullable = false , length = 30)
    private String goal;    // 목적지
	
	@Column(name = "waypoints", length = 255)
    private String waypoints; // 경유지
	
	@Column(name = "day", nullable = false , length = 10)
    private int day;       // 일자
    
    
    @ManyToOne
    @JoinColumns({
    	 @JoinColumn(name = "user_id", referencedColumnName = "user_id"), // TripEntity의 만 매핑
    	 @JoinColumn(name = "trip_title", referencedColumnName = "title") // TripEntity의 만 매핑
    })
    private TripEntity trip; // 외래 키 매핑
	
	
}
