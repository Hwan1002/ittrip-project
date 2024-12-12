package project.map.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
import project.map.entity.UserEntity;
import project.map.repository.AreaRepository;
import project.map.repository.CheckListRepository;
import project.map.repository.MapRepository;
import project.map.repository.TripRepository;
import project.map.repository.UserRepository;
import project.map.service.TripService;

@RestController
@RequestMapping
public class TripController {
	
	private TripService tripService;
	private TripRepository tripRepository;
	private MapRepository mapRepository;
	private CheckListRepository checkListRepository;
	private UserRepository userRepository;
	private AreaRepository areaRepository;
	
	//----------------	메인페이지  -----------------------
	//areaNm에 대한 signguNm리스트 반환
	//만약 @RequestParam으로 쓰면 (@RequestParam String AreaNm)
	@GetMapping("/1")
	public ResponseEntity<?> getAreaCd(@RequestParam String area){
		List<AreaEntity> list = tripService.getSignguNms(area);
		List<AreaDTO> dtos = list.stream().map(AreaDTO::new).toList();
		ResponseDTO<AreaDTO> response = ResponseDTO.<AreaDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//areaNm과 signguNm으로 cd들 반환
	//만약 @RequestParam으로 쓰면 (@RequestParam String areaNm,@RequestParam String signguNm)
	@GetMapping("/2")
	public ResponseEntity<?> getCds(@RequestParam String areaNm,@RequestParam String signguNm ){
		String areaNmDetail = areaRepository.findAreaCdBySignguNm(signguNm);
		List<AreaEntity> list = tripService.getCds(areaNmDetail,signguNm);
		List<AreaDTO> dtos = list.stream().map(AreaDTO::new).toList();
		ResponseDTO<AreaDTO> response = ResponseDTO.<AreaDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	} 
	//
	//----------------  메인페이지  ----------------------
	
	//------------------  GET   -----------------------
	//!!!!!!!!Get방식에는 @RequestParam을 권장한다고 하니 나중에 교체할지도!!!!!
	//TripEntity 객체들 반환(여행목록에 여행리스트)
	//만약 @RequestParam으로 쓰면 (@RequestParam String userId)
	@GetMapping("/3")
	public ResponseEntity<?> getTrips(@RequestParam String userId){
		List<TripEntity> list = tripService.getTrips(userId);
		List<TripDTO> dtos = list.stream().map(TripDTO::new).toList();
		ResponseDTO<TripDTO> response = ResponseDTO.<TripDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//MapEntity 객체들 반환(userId와 title을 통해서 map객체(days,start정보 등등 받아옴))
	//만약 @RequestParam으로 쓰면 (@RequestParam String userId,@RequestParam String title)
	@GetMapping("/4")
	public ResponseEntity<?> getMaps(@RequestParam String userId,@RequestParam String tripTitle){
		List<MapEntity> list = tripService.getMaps(userId, tripTitle);
		List<MapDTO> dtos = list.stream().map(MapDTO::new).toList();
		ResponseDTO<MapDTO> response = ResponseDTO.<MapDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//CheckListEntity 객체 반환(userId와 title을 통해서 checkList객체(checkList) 받아옴)
	//만약 @RequestParam으로 쓰면 (@RequestParam String userId, String title)
	@GetMapping("/5")						
	public ResponseEntity<?> getCheckList(@RequestParam String userId,@RequestParam String tripTitle){
		CheckListEntity entity = tripService.getCheckLists(userId, tripTitle);
		String[] response = tripService.stringToMap(entity.getCheckList());
		return ResponseEntity.ok(response);
	}
	//-----------------  GET   ----------------------------
	
	//-----------------  POST   ---------------------------
	
	//trip객체 : 제목,출발일,도착일 db저장
	@PostMapping("/1")
	public void postTrips(@RequestBody TripDTO dto){
		UserEntity user = userRepository.findById(dto.getUserId()).get();
		 String titleToCheck = tripService.titleToDB(dto.getTitle(), dto.getUserId());
		 String confirmedTitle = tripService.titleConfirm(titleToCheck);
		 TripEntity entity = TripEntity.builder()
			        .title(confirmedTitle)
			        .startDate(dto.getStartDate())
			        .lastDate(dto.getLastDate())
			        .user(user)
			        .build();
		 tripRepository.save(entity);
	}
	
	//map객체 저장
	@PostMapping("/2")
	public void postMaps(@RequestBody MapDTO dto) {
		UserEntity user = userRepository.findById(dto.getUserId()).get();
		TripEntity trip = tripRepository.findByTitle(dto.getTripTitle());
		MapEntity entity = MapEntity.builder().
				startPoint(dto.getStartPoint()).
				startPlace(dto.getStartPlace()).
				startAddress(dto.getStartAddress()).
				goalPoint(dto.getGoalPoint()).
				goalPlace(dto.getGoalPlace()).
				goalAddress(dto.getGoalAddress()).
				waypointsPoint(dto.getWaypointsPoint()).
				waypointsPlace(dto.getWaypointsPlace()).
				waypointsAddress(dto.getWaypointsAddress()).
				days(dto.getDays()).
				user(user).
				trip(trip).
				build();
					
		mapRepository.save(entity);
	}
	
	//checkList객체 저장
	@PostMapping("/3")
	public void postCheckList(@AuthenticationPrincipal String userId,@RequestBody CheckListDTO dto) {
		UserEntity user = userRepository.findById(userId).get();
		TripEntity trip = tripRepository.findByTitle(dto.getTripTitle());
		String checkList = tripService.mapToString(dto.getCheckListArray());
		CheckListEntity entity = CheckListEntity.builder().
												checkList(checkList).
												trip(trip).
												user(user).
												build();
		checkListRepository.save(entity);
	}
	
	//-----------------  POST   ---------------------------
	//-----------------  PUT ---------------------------
	
	@PutMapping("/1")
	public void putTrip(@RequestBody TripDTO dto) {
		UserEntity user = userRepository.findById(dto.getUserId()).get();
		String titleToCheck = tripService.titleToDB(dto.getTitle(), dto.getUserId());
		 String confirmedTitle = tripService.titleConfirm(titleToCheck);
		 TripEntity entity = TripEntity.builder()
				 	.idx(dto.getIdx())		//post와 다른 점은 이거뿐
			        .title(confirmedTitle)
			        .startDate(dto.getStartDate())
			        .lastDate(dto.getLastDate())
			        .user(user)
			        .build();
		 tripRepository.save(entity);
	}
	
	@PutMapping("/2")
	public void putMap(@RequestBody MapDTO dto) {
		UserEntity user = userRepository.findById(dto.getUserId()).get();
		TripEntity trip = tripRepository.findByTitle(dto.getTripTitle());
		MapEntity entity = MapEntity.builder().
				idx(dto.getIdx()).
				startPoint(dto.getStartPoint()).
				startPlace(dto.getStartPlace()).
				startAddress(dto.getStartAddress()).
				goalPoint(dto.getGoalPoint()).
				goalPlace(dto.getGoalPlace()).
				goalAddress(dto.getGoalAddress()).
				waypointsPoint(dto.getWaypointsPoint()).
				waypointsPlace(dto.getWaypointsPlace()).
				waypointsAddress(dto.getWaypointsAddress()).
				days(dto.getDays()).
				trip(trip).
				user(user).
				build();	
		
		mapRepository.save(entity);
	}
	
	@PutMapping("/3")
	public void putCheckList(@RequestBody CheckListDTO dto) {
		UserEntity user = userRepository.findById(dto.getUserId()).get();
		TripEntity trip = tripRepository.findByTitle(dto.getTripTitle());
		String checkList = tripService.mapToString(dto.getCheckListArray());
		CheckListEntity entity = CheckListEntity.builder().
												idx(dto.getIdx()).
												checkList(checkList).
												trip(trip).
												user(user).
												build();
		checkListRepository.save(entity);
	}
	//-----------------  PUT ---------------------------
	//----------------- DELETE -------------------------
	@DeleteMapping("/1/{idx}")
	public void deleteTrip(@PathVariable Integer idx) {
		tripRepository.deleteById(idx);
	}
	
	@DeleteMapping("/2/{idx}")
	public void deleteMap(@PathVariable Integer idx) {
		mapRepository.deleteById(idx);
	}
	
	@DeleteMapping("/3/{idx}")
	public void deleteCheckList(@PathVariable Integer idx) {
		checkListRepository.deleteById(idx);
	}
	//----------------- DELETE -------------------------
}