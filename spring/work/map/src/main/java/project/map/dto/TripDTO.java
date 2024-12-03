package project.map.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.TripEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TripDTO {
	
	private String id;
	private String title;
	private Date startDate;
	private Date lastDate;
	
	public TripDTO(TripEntity entity) {
		this.id = entity.getId();
		this.title = entity.getTitle();
		this.startDate = entity.getStartDate();
		this.lastDate = entity.getLastDate();
	}
	
	public static TripEntity toEntity(TripDTO dto) {
		return TripEntity.builder().
				id(dto.getId()).
				title(dto.getTitle()).
				startDate(dto.getStartDate()).
				lastDate(dto.getLastDate()).
				build();
				
				
	}
}
