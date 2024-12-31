package project.map.dto;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.map.entity.CheckListEntity;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CheckListDTO {
	
	@Data
    @NoArgsConstructor
    @AllArgsConstructor
	public static class Items{
		private Long id;
		private String text;
		private boolean checked;
		
		public Items(Long id, String text, Boolean checked) {
	        this.id = id;
	        this.text = text;
	        this.checked = checked;
	    }
	}
	
	private List<Items> items;
	private String userId;		//UserEntity의 id
	private Integer tripIdx;	
	
	public CheckListDTO(CheckListEntity entity) {
		this.userId = entity.getUser().getId();
		this.tripIdx = entity.getTrip().getIdx();
	}

}
