package project.map.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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
	private String idetifier;
	private String checkList;
	
	@ManyToOne
	@JoinColumn(name="identifier", referencedColumnName="idx", insertable=false, updatable=false)
	private TripEntity trip;
}
