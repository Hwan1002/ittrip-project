package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.MapsId;
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
public class CheckListEntity {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private String identifier;
	
	private String checkList;	//체크리스트 배열을 db저장을 위해 스트링으로 변환해서 받을 것
	
	@OneToOne
	@JoinColumn(name = "trip_idx",referencedColumnName="idx")
	@MapsId("identifier")
    private TripEntity trip;
}
