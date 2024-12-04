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
	
	@Column(name = "start_point", nullable = false , length = 30)
    private String startPoint;   // 출발지좌표
	
	@Column(name = "goal_point", nullable = false , length = 30)
    private String goalPoint;    // 목적지좌표
	
	@Column(name = "waypoints_point", length = 255)
    private String waypointsPoint; // 경유지좌표
	
	@Column(name = "start_place", nullable = false , length = 30)
    private String startPlace;   // 출발지지번주소
	
	@Column(name = "goal_place", nullable = false , length = 30)
    private String goalPlace;    // 목적지지번주소
	
	@Column(name = "waypoints_place", length = 255)
    private String waypointsPlace; // 경유지지번주소
	
	@Column(name = "days", nullable = false , length = 10)
    private int days;       // 일자
    
    
    @ManyToOne
    	 @JoinColumn(name = "trip_title", referencedColumnName = "title") // TripEntity의 만 매핑
    private TripEntity trip; // 외래 키 매핑
    
    @ManyToOne
    @JoinColumn(name = "user_id",nullable=false) // 외래키: user_id
    private UserEntity user;
	
	
}
