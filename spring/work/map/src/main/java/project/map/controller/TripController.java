package project.map.controller;

import java.io.Console;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import lombok.extern.slf4j.Slf4j;
import project.map.dto.AreaDTO;
import project.map.dto.CheckListDTO;
import project.map.dto.CheckListDTO.Items;
import project.map.dto.MapDTO;
import project.map.dto.MapDTO.MapObject;
import project.map.dto.ResponseDTO;
import project.map.dto.TripDTO;
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
@Slf4j
public class TripController {

	@Autowired
	private TripService tripService;
	@Autowired
	private TripRepository tripRepository;
	@Autowired
	private MapRepository mapRepository;
	@Autowired
	private CheckListRepository checkListRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AreaRepository areaRepository;

	
	
	
	// 메인페이지 areaCd를 통해 SignguNm 모달위에 매핑
	@GetMapping("/1")
	public ResponseEntity<?> getSignguNm(@RequestParam (name = "areaCd") String areaCd) {

		try {
			System.out.println("areaCd: " + areaCd);
			List<String> dtos = tripService.getSignguNms(areaCd);
			ResponseDTO<String> response = ResponseDTO.<String>builder().data(dtos).build();
			System.out.println(response);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace(); // 에러 로그 출력
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
		}
	}
	

	

	// areaNm과 signguNm으로 cd들 반환
	// 만약 @RequestParam으로 쓰면 (@RequestParam String areaNm,@RequestParam String
	// signguNm)
	@GetMapping("/2")
	public ResponseEntity<?> getCds(@RequestParam String areaNm, @RequestParam String signguNm) {
		String areaNmDetail = areaRepository.findAreaCdBySignguNm(signguNm);
		List<AreaEntity> list = tripService.getCds(areaNmDetail, signguNm);
		List<AreaDTO> dtos = list.stream().map(AreaDTO::new).toList();
		ResponseDTO<AreaDTO> response = ResponseDTO.<AreaDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	//
	// ---------------- 메인페이지 ----------------------

	// ------------------ GET -----------------------
	// !!!!!!!!Get방식에는 @RequestParam을 권장한다고 하니 나중에 교체할지도!!!!!
	// TripEntity 객체들 반환(여행목록에 여행리스트)
	// 만약 @RequestParam으로 쓰면 (@RequestParam String userId)
	@GetMapping("/3")
	public ResponseEntity<?> getTrips(@AuthenticationPrincipal String userId) { // requestParam 으로 userId를 받지않고
		List<TripEntity> list = tripService.getTrips(userId);
		System.out.println(list);
		List<TripEntity> updatedList = list.stream()
			    .map(data -> {
			        String updatedTitle = tripService.titleFromDB(data.getTitle()); 
			        return TripEntity.builder()
			            .idx(data.getIdx())  // 기존 필드값 유지
			            .startDate(data.getStartDate())  // 기존 필드값 유지
			            .lastDate(data.getLastDate())  // 기존 필드값 유지			
			            .title(updatedTitle)  // 변경된 title
			            .user(data.getUser())  
			            .build();
			    })
			    .collect(Collectors.toList());
		List<TripDTO> dtos = updatedList.stream().map(TripDTO::new).toList();
		ResponseDTO<TripDTO> response = ResponseDTO.<TripDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}

	// MapEntity 객체들 반환(userId와 title을 통해서 map객체(days,start정보 등등 받아옴))
	// 만약 @RequestParam으로 쓰면 (@RequestParam String userId,@RequestParam String
	// title)
	@GetMapping("/4")
	public ResponseEntity<?> getMaps(@AuthenticationPrincipal String userId, @RequestParam(name="tripTitle") String tripTitle) {
		String title = tripService.titleToDB(userId, tripTitle);
		List<MapEntity> list = tripService.getMaps(userId, title);
		TripEntity trip = tripRepository.getByTitle(title);
		trip.setTitle(tripService.titleFromDB(title));
		List<MapEntity> updatedList = list.stream().map(data -> {
 
			        return MapEntity.builder().trip(trip).user(data.getUser())
			        		.startPlace(data.getStartPlace()).startAddress(data.getStartAddress())
			        		.goalPlace(data.getGoalPlace()).goalAddress(data.getGoalAddress())
			        		.waypoint(data.getWaypoint()).days(data.getDays()).build();
			    }).collect(Collectors.toList());
			        		
		System.out.println("trip :"+trip);
		System.out.println("updatedlist : "+updatedList);
		List<MapDTO> dtos = updatedList.stream().map(MapDTO::new).toList();
		return ResponseEntity.ok(dtos);
	}

	
//	@GetMapping("/5")
//	public ResponseEntity<?> getCheckList(@AuthenticationPrincipal String userId, @RequestParam(name="tripTitle") String tripTitle) {
//		String title = tripService.titleToDB(userId, tripTitle);
//		String items = tripService.getCheckLists(userId, title);
//		Integer findedIdx = tripService.getIdxByItems(items);
//		List<Items> list = tripService.parseItems(items);
//		List<CheckListEntity> entity = CheckListEntity.builder().idx(findedIdx).items(items).build();
//		ResponseDTO<Items> response = ResponseDTO.<Items>builder().data(list).build();
//		return ResponseEntity.ok(response);
//	}
	
	// ----------------- GET ----------------------------

	// ----------------- POST ---------------------------

	// trip객체 : 제목,출발일,도착일 db저장
	@PostMapping("/1")
	public void postTrips(@AuthenticationPrincipal String userId, @RequestBody TripDTO dto) {
		UserEntity user = userRepository.findById(userId).get();
		String titleToCheck = tripService.titleToDB(userId,dto.getTitle());
		String confirmedTitle = tripService.titleConfirm(titleToCheck);
		TripEntity entity = TripEntity.builder().title(confirmedTitle).startDate(dto.getStartDate())
				.lastDate(dto.getLastDate()).user(user).build();
		tripRepository.save(entity);

	}

	// map객체 저장
	@PostMapping("/2")
	public void postMaps(@AuthenticationPrincipal String userId, @RequestBody MapDTO dto) {
		UserEntity user = userRepository.findById(userId).get();
		String title = tripService.titleToDB(userId, dto.getTripTitle());
		TripEntity trip = tripRepository.getByTitle(title);
		System.out.println("Received MapDTO:");
        
		StringBuilder waypointsBuilder;
        for (MapDTO.MapObject mapObject : dto.getMapObject()){
        	waypointsBuilder = new StringBuilder();
            int days = mapObject.getDays();
            String startPlace = mapObject.getStartPlace().replaceAll("</?[^>]+>", "");
            String startAddress = mapObject.getStartAddress();
            String goalPlace = mapObject.getGoalPlace().replaceAll("</?[^>]+>", "");
            String goalAddress = mapObject.getGoalAddress();
            
            for (MapDTO.WayPointDTO wayPoint : mapObject.getWayPoints()) {
            	waypointsBuilder
                .append(wayPoint.getId())
                .append(":")
                .append(wayPoint.getValue().replaceAll("</?[^>]+>", ""))
                .append(":")
                .append(wayPoint.getAddress())
                .append("|");
            }
            if (waypointsBuilder.length() > 0) {
                waypointsBuilder.setLength(waypointsBuilder.length() - 1);
            }
            String waypoints = waypointsBuilder.toString();
            
            MapEntity entity = MapEntity.builder().user(user).trip(trip).days(days).startPlace(startPlace).startAddress(startAddress)
            				.goalPlace(goalPlace).goalAddress(goalAddress).waypoint(waypoints).build();
            System.out.println(entity);
            mapRepository.save(entity);
            
        }
	
	}

	// checkList객체 저장
		@PostMapping("/3")
		public void postCheckList(@AuthenticationPrincipal String userId, @RequestBody CheckListDTO dto) {
			UserEntity user = userRepository.findById(userId).get();
			String title = tripService.titleToDB(userId, dto.getTripTitle());
			TripEntity trip = tripRepository.getByTitle(title);
			CheckListEntity entity = CheckListEntity.builder().user(user).trip(trip).
					items(dto.getItems().stream().map(item -> item.getId() + ":" + item.getText() + ":" + item.isChecked()) // 문자열 변환 예시
                    .collect(Collectors.joining("|"))) // 리스트 -> 문자열 합치기
            .build();
			checkListRepository.save(entity) ;	
		}

	// ----------------- POST ---------------------------
	// ----------------- PUT ---------------------------

	@PutMapping("/1")
	public void putTrip(@AuthenticationPrincipal String userId, @RequestBody TripDTO dto) {
		UserEntity user = userRepository.findById(userId).get();
		String titleToCheck = tripService.titleToDB(userId, dto.getTitle());
		String confirmedTitle = tripService.titleConfirm(titleToCheck);
		TripEntity entity = TripEntity.builder().idx(dto.getIdx()) //GetMapping에서 idx를 받았기에 다시 가져온 idx로 trip을 구분하여 수정
				.title(confirmedTitle).startDate(dto.getStartDate()).lastDate(dto.getLastDate()).
				user(user).build();
		tripRepository.save(entity);
	}

	@PutMapping("/2")
	public void putMap(@AuthenticationPrincipal String userId, @RequestBody MapDTO dto) {
		UserEntity user = userRepository.findById(userId).get();
		TripEntity trip = tripRepository.getByTitle(dto.getTripTitle());
		List<MapObject> dtos = dto.getMapObject();
		System.out.println(dtos);
	}

	@PutMapping("/3")
	public ResponseEntity<?> putCheckList(@AuthenticationPrincipal String userId, @RequestBody CheckListDTO dto) {
		UserEntity user = userRepository.findById(userId).get();
		String title = tripService.titleToDB(userId, dto.getTripTitle());
		TripEntity trip = tripRepository.getByTitle(title);
		CheckListEntity entity = CheckListEntity.builder().user(user).trip(trip).
				items(dto.getItems().stream().map(item -> item.getId() + ":" + item.getText() + ":" + item.isChecked()) // 문자열 변환 예시
                .collect(Collectors.joining(","))) // 리스트 -> 문자열 합치기
        .build();
		checkListRepository.save(entity) ;
		return ResponseEntity.ok("수정 성공");
	}

	// ----------------- PUT ---------------------------
	// ----------------- DELETE -------------------------
	@DeleteMapping("/1/{idx}")
	public void deleteTrip(@PathVariable("idx") Integer idx) { // pathVariable 어노테이션 사용시 { } 안에들어간 값과 idx 매개변수를 인식하기위해서는
																// 어노테이션 뒤 같은 이름을 명시해야 한다 .
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
	// ----------------- DELETE -------------------------

}