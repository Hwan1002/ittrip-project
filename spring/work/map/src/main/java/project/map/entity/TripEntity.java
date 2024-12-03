
//package project.map.entity;
//
//import java.sql.Date;
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.EmbeddedId;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.IdClass;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.MapsId;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.OneToOne;
//import jakarta.persistence.Table;
//import jakarta.persistence.Transient;
//import lombok.AllArgsConstructor;
//import lombok.Builder;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//
//@Builder
//@AllArgsConstructor
//@NoArgsConstructor
//@Data
//@Table(name = "TRIP")
//@Entity
//public class TripEntity {
//
//    @EmbeddedId
//    private TripId id; // 복합키
//
//    private Date startDate;  // 계획 첫날
//    private Date lastDate;   // 계획 마지막날
//    private Date addDate;    // 데이터 로드한 날
//    private Date updateDate; // 데이터 수정한 날
//    private String title;    // 여행 제목
//    
//    @Transient
//    public Integer getIdx() {
//        return id.getIdx();
//    }
//    
//    @Transient
//    public String getUserId() {
//        return id.getUserId();
//    }
//    
//    
//    // 복합키의 userId 필드와 UserEntity를 매핑
//    @ManyToOne
//    @MapsId("userId")
//    @JoinColumn(name = "user_id",referencedColumnName = "id",nullable=false) // 외래키: user_id
//    private UserEntity user;
//}
