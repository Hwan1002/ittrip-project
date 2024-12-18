
package project.map.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
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

@EntityListeners(AuditingEntityListener.class) // Spring Data JPA Auditing 활성화를 위해 추가됨 
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "TRIP")
@Entity
public class TripEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "idx", nullable = false)
    private Integer idx; 	 //식별자
    
    
    @Column(name = "start_date", nullable = false)
    private LocalDate  startDate;  // 계획 첫날 	// 타입 Date 를 localDateTime으로 변경했음 
    
    @Column(name = "last_date", nullable = false)
    private LocalDate lastDate;   // 계획 마지막날
    
    @CreatedDate
    @Column(name = "add_date", nullable = false)
    private LocalDate addDate;    // 데이터 로드한 날
    
    @LastModifiedDate
    @Column(name = "update_date", nullable = false)
    private LocalDate updateDate; // 데이터 수정한 날
    

    @Column(name = "title",unique=true ,nullable = false, length = 50)
    private String title;    // 여행 제목
    
   
    @ManyToOne
    @JoinColumn(name = "user_id",nullable=false) // 외래키: user_id
    private UserEntity user;
}

