//package project.map.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.IdClass;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.JoinColumns;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.MapsId;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
//@Data
//@Table(name = "MAP")
//@Entity
//public class MapEntity {
//	
//	@Id
//    private String identifier; // Primary Key
//	
//    private String start;   // 출발지
//    private String goal;    // 목적지
//    private String waypoints; // 경유지
//    private int days;       // 일자
//    
//    
//    @ManyToOne
//    @JoinColumn(name = "trip_idx", referencedColumnName = "idx") // TripEntity의 idx만 매핑
//    private TripEntity trip; // 외래 키 매핑
//	
//	
//}
