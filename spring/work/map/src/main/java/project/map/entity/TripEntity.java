package project.map.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@IdClass(TripId.class)
public class TripEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idx;
	@Id
	private String userId;
	
	private Date startDate;	//계획첫날
	private Date lastDate; //계획마지막날
	
	private Date addDate;	//데이터 로드한 날
	private Date updateDate;//데이터 수정한 날
	private String title;	//여행 제목
	
	//관계 선언
	@ManyToOne
<<<<<<< HEAD
	@JoinColumn(name="idx")
=======
	@JoinColumn(name="userId", referencedColumnName="id")
	@MapsId("userId")
>>>>>>> test
	private UserEntity user;
	
//	@OneToOne(mappedBy = "tripId", cascade = CascadeType.ALL)
//	private MapEntity map;		//관계를 위한 정의
//	
//	@OneToMany(mappedBy = "tripId", cascade = CascadeType.ALL)
//	private List<CheckListEntity> checklists;
}
