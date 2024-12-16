package project.map.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.map.entity.AreaEntity;
import project.map.entity.CheckListEntity;
import project.map.entity.MapEntity;
import project.map.entity.TripEntity;
import project.map.repository.AreaRepository;
import project.map.repository.CheckListRepository;
import project.map.repository.MapRepository;
import project.map.repository.TripRepository;

@Service
public class TripService {
	
	@Autowired
	private MapRepository mapRepository;
	@Autowired
	private TripRepository tripRepository;
	@Autowired
	private CheckListRepository checkListRepository;
	@Autowired
	private AreaRepository areaRepository;
	
	//--------------------데이터 가공----------------------------
	//경유지 String -> String[] (directions 15 요청에서 waypoints의 타입이 "|"로 구분된 String이라서 변환해주는 것)
	public String[] stringToMap(String wayPoints) {
		return wayPoints.split("|");
	}
	//경유지 String[] -> String (다시 React에서 배열로 사용해야 하기 때문)
	//체크리스트 String[] -> String
	public String mapToString(String[] waypoints) {
		return String.join("|", waypoints);
	}
	//DB에 title 넣을 때 ID/Title 형태로 가공하는 로직
	public String titleToDB(String title,String userId) {
		return userId+"/"+title;
	}
	//DB에서 title 가져올 때 ID/를 제거하는 로직
	public String titleFromDB(String title) {
		String[] arr = title.split("/");
		return arr[1];
	}
	//타이틀이 중복이면 (2),(3) 하나씩 증가(DB에 여행 하나를 저장하기 전에 중복을 확인해서 title값을 변경해주는 역할)
	public String titleConfirm(String title) {
	    int count = 2;
	    String newTitle = title;
	    while (tripRepository.existsByTitle(newTitle)) {
	        if (newTitle.matches(".*\\(\\d+\\)$")) {
	            // 이미 (숫자) 형식이 포함된 경우, 숫자를 증가시킴
	            newTitle = newTitle.replaceAll("\\(\\d+\\)$", "(" + count + ")");
	        } else {
	            // 처음으로 (2)를 추가
	            newTitle = title + "(" + count + ")";
	        }
	        count++;
	    }
	    return newTitle;
	}

	//---------------------------------------------------------
	
	//-------------------------메인페이지 기능---------------------
	//ex) 인천광역시를 누르면 인천시에 대한 부평구,남동구 등등의 리스트를 반환
	public List<AreaEntity> getSignguNms(String area){
			List<AreaEntity> list = areaRepository.getAreaList(area);
			return list;
		}
	
	//ex)이후 부평구를 누르면 인천광역시 부평구에 대한 areaCd,signguCd 반환 - 반환된 값으로 바로 공공데이터 요청을 할 것임
	public List<AreaEntity> getCds(String areaNm,String signguNm){
		return areaRepository.recommendByAddress(areaNm, signguNm);
	}
	//----------------------------------------------------------
	
	//userId 기반으로 trip객체들을 반환 (여행목록에 사용자가 설정한 여행리스트 렌더링)
	public List<TripEntity> getTrips(String userId){
		return tripRepository.getTripsByUserId(userId);
	}
	
//  지우지 마세요
//	//user_Id를 기반으로 가져온 trip에서 title 변경하기 (dto.gettitle=title,dto.getUserId()=userId,updatedTitle=사용자가 입력한 title)
//	public TripEntity updateTitle(String title,String updateTitle,String userId) {
//		String tempTitle = titleToDB(title,userId);		//DB에 저장된 title과 비교하기위해 가공
//		Integer idx = tripRepository.getidxByTitle(tempTitle);	//가공된 title로 idx 반환
//		TripEntity entity = tripRepository.findAllByIdx(idx);	//idx로 Trip객체 찾아서 반환
//		return tripRepository.updateTitleByIdx(updateTitle,idx);							
//	}
	
	//trip의 title을 받아서 MapEntity들 반환하기
	public List<MapEntity> getMaps(String userId,String title,Integer days){
		return mapRepository.getLocation(userId, title,days);
	}
	
	//trip의 title을 받아서 CheckListEntity 반환하기
	public CheckListEntity getCheckLists(String userId,String title){
		return checkListRepository.getCheckListByUserIdAndTitle(userId, title);
	}
	
}
