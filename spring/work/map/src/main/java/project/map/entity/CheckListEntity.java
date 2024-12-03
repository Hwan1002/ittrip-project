//package project.map.entity;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
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
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Table(name = "CHECKLIST")
//@Entity
//public class CheckListEntity {
//	
//	@Id
//    private String identifier; // Primary Key
//	
//	private String checkList;	//체크리스트 배열을 db저장을 위해 스트링으로 변환해서 받을 것
//	
//	
//	@ManyToOne
//    @JoinColumn(name = "trip_idx", referencedColumnName = "idx") // TripEntity의 idx만 매핑
//    private TripEntity trip; // 외래 키 매핑
//	
//	
//	
//	
//	
//	
//}
