package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
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
	private String identifier;
	
	private String checkList;	//체크리스트 배열을 db저장을 위해 스트링으로 변환해서 받을 것
	
	@ManyToOne
	@JoinColumns({
		@JoinColumn(name = "idx"),
        @JoinColumn(name = "id")
    })
    private TripEntity trip;
}
