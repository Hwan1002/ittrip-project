package project.map.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "CHECKLIST")
@Entity
public class CheckListEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name = "idx", nullable = false)
    private Integer idx; // Primary Key
	
	@Column(name = "checklist",length = 255)
	private String checkList;	//체크리스트 배열을 db저장을 위해 스트링으로 변환해서 받을 것
	
	
	@OneToOne
   	 @JoinColumn(name = "trip_title", referencedColumnName = "title") // TripEntity의 만 매핑
    private TripEntity trip; // 외래 키 매핑
	
	@ManyToOne
    @JoinColumn(name = "user_id",nullable=false) // 외래키: user_id
    private UserEntity user;
	
	
	
	
	
	
}
