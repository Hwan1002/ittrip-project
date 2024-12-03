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
	
	private String userId;
	private String title;
	private Date startDate;
	private Date lastDate;
	
	public TripDTO(TripEntity entity) {
		this.userId = entity.getUserId();
		this.title = entity.getTitle();
		this.startDate = entity.getStartDate();
		this.lastDate = entity.getLastDate();
	}
	
	public static TripEntity toEntity(TripDTO dto) {
		return TripEntity.builder().
				userId(dto.getUserId()).
				title(dto.getTitle()).
				startDate(dto.getStartDate()).
				lastDate(dto.getLastDate()).
				build();
				
				
	}
}
