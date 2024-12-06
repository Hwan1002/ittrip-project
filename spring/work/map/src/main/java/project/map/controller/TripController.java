package project.map.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.map.dto.AreaDTO;
import project.map.dto.CheckListDTO;
import project.map.dto.MapDTO;
import project.map.dto.ResponseDTO;
import project.map.dto.TripDTO;
import project.map.dto.UserDTO;
import project.map.entity.AreaEntity;
import project.map.entity.CheckListEntity;
import project.map.entity.MapEntity;
import project.map.entity.TripEntity;
import project.map.service.TripService;

@RestController
@RequestMapping
public class TripController {
	
	private TripService tripService;
	
	//----------------	메인페이지  -----------------------
	//areaNm에 대한 signguNm리스트 반환
	//만약 @RequestParam으로 쓰면 (@RequestParam String AreaNm)
	@GetMapping("/1")
	public ResponseEntity<?> getAreaCd(@RequestBody AreaDTO dto){
		List<AreaEntity> list = tripService.getAreaCd(dto.getAreaNm());
		List<AreaDTO> dtos = list.stream().map(AreaDTO::new).toList();
		ResponseDTO<AreaDTO> response = ResponseDTO.<AreaDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//areaNm과 signguNm으로 cd들 반환
	//만약 @RequestParam으로 쓰면 (@RequestParam String areaNm,@RequestParam String signguNm)
	@GetMapping("/2")
	public ResponseEntity<?> getCds(@RequestBody AreaDTO dto){
		List<AreaEntity> list = tripService.getCds(dto.getAreaNm(),dto.getSigunguNm());
		List<AreaDTO> dtos = list.stream().map(AreaDTO::new).toList();
		ResponseDTO<AreaDTO> response = ResponseDTO.<AreaDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	} 
	//----------------  메인페이지  ----------------------
	
	//------------------  GET   -----------------------
	//!!!!!!!!Get방식에는 @RequestParam을 권장한다고 하니 나중에 교체할지도!!!!!
	//TripEntity 객체들 반환(여행목록에 여행리스트)
	//만약 @RequestParam으로 쓰면 (@RequestParam String userId)
	@GetMapping("/3")
	public ResponseEntity<?> getTrips(@RequestBody UserDTO dto){
		List<TripEntity> list = tripService.getTrips(dto.getId());
		List<TripDTO> dtos = list.stream().map(TripDTO::new).toList();
		ResponseDTO<TripDTO> response = ResponseDTO.<TripDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//MapEntity 객체들 반환(userId와 title을 통해서 map객체(days,start정보 등등 받아옴))
	//만약 @RequestParam으로 쓰면 (@RequestParam String userId,@RequestParam String title)
	@GetMapping("/4")
	public ResponseEntity<?> getMaps(@RequestBody TripDTO dto){
		List<MapEntity> list = tripService.getMaps(dto.getUserId(), dto.getTitle());
		List<MapDTO> dtos = list.stream().map(MapDTO::new).toList();
		ResponseDTO<MapDTO> response = ResponseDTO.<MapDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//CheckListEntity 객체 반환(userId와 title을 통해서 checkList객체(checkList) 받아옴)
	//만약 @RequestParam으로 쓰면 (@RequestParam String userId, String title)
	@GetMapping("/5")						
	public ResponseEntity<?> getCheckList(@RequestBody CheckListDTO dto){
		CheckListEntity entity = tripService.getCheckLists(dto.getUserId(), dto.getTripTitle());
		String[] response = tripService.stringToMap(entity.getCheckList());
		return ResponseEntity.ok(response);
	}
	//-----------------  GET   ----------------------------
	
	//-----------------  POST   ---------------------------
	
	
}