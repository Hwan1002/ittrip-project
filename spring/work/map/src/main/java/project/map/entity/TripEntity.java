
package project.map.entity;

import java.sql.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
    private Date startDate;  // 계획 첫날
    
    @Column(name = "last_date", nullable = false)
    private Date lastDate;   // 계획 마지막날
    
    @CreatedDate
    @Column(name = "add_date", nullable = false)
    private Date addDate;    // 데이터 로드한 날
    
    @LastModifiedDate
    @Column(name = "update_date", nullable = false)
    private Date updateDate; // 데이터 수정한 날
    

    @Column(name = "title",unique=true ,nullable = false, length = 50)
    private String title;    // 여행 제목
    
   
    @ManyToOne
    @JoinColumn(name = "user_id",nullable=false) // 외래키: user_id
    private UserEntity user;
}

