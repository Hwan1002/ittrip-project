package project.map.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.CheckListEntity;
import project.map.entity.TripEntity;
import project.map.entity.UserEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TripDTO {
	
	private Integer idx;
	private String title;
	private Date startDate;
	private Date lastDate;
	private String userId;
	
	
	public static TripDTO fromEntity(TripEntity entity) {
        return TripDTO.builder()
                .idx(entity.getIdx())
                .startDate(entity.getStartDate())
                .lastDate(entity.getLastDate())
                .title(entity.getTitle())
                .userId(entity.getUser() != null ? entity.getUser().getId().toString() : null)
                .build();
    }

    // DTO -> Entity 변환 메서드
    public TripEntity toEntity(UserEntity user) {
        return TripEntity.builder()
                .idx(this.idx)
                .startDate(this.startDate)
                .lastDate(this.lastDate)
                .title(this.title)
                .user(user) // UserEntity 설정
                .build();
    }
}
