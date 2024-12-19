package project.map.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "map")
@Entity
public class MapEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
    private Integer idx; // Primary Key
	
	@Column(name = "start_place", nullable = false)
    private String startPlace;   // 출발지 상호명
	
	@Column(name = "start_address", nullable = false)
	private String startAddress;	//출발지 지번주소
	
	@Column(name = "goal_place", nullable = false)
    private String goalPlace;    // 목적지 상호명
	
	@Column(name = "goal_address", nullable = false)
	private String goalAddress;	// 목적지 지번주소
	
	@Column(name = "waypoint")
    private String waypoint; // 경유지 상호명
	
//	@Column(name = "waypoint_place")
//    private String waypointPlace; // 경유지 상호명
//	
//	@Column(name = "waypoint_address")
//	private String waypointAddress;	// 경유지 지번주소
	
	@Column(name = "days", nullable = false , length = 10)
    private Integer days;       // 일자
    
    @ManyToOne
    @JoinColumn(name = "trip_title", referencedColumnName = "title") // TripEntity의 만 매핑
    private TripEntity trip; // 외래 키 매핑
    
    @ManyToOne
    @JoinColumn(name = "user_id",nullable=false) // 외래키: user_id
    private UserEntity user;
	
	
}
